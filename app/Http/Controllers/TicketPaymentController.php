<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketPayment;
use App\Models\BoothTicket;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Console\Output\ConsoleOutput;
use Inertia\Inertia;

class TicketPaymentController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Fetch payments belonging only to events owned by this specific user
        $payments = TicketPayment::with(['ticket.event', 'booth'])
            ->whereHas('ticket.event', function ($query) use ($user) {
                $query->where('owner_id', $user->id);
            })
            ->latest()
            ->get()
            ->map(function ($payment) {
                return [
                    'id'             => $payment->id,
                    'booth_name'     => $payment->booth->name ?? 'Unknown Tenant',
                    'ticket_name'    => $payment->ticket->name ?? 'Unknown Space',
                    'event_name'     => $payment->ticket->event->name ?? 'Unknown Event',
                    'payment_method' => $payment->payment_method,
                    'grand_total'    => $payment->grand_total,
                    'status'         => $payment->status,
                    'created_at'     => $payment->created_at ? $payment->created_at->format('d M Y, H:i') : '-',
                ];
            });

        return Inertia::render('Registrations/Index', [
            'payments' => $payments,
        ]);
    }

    private static array $statusMap = [
        "pending" => ["pending"],
        "completed" => [
            "capture",
            "settlement",
            "refund",
            "chargeback",
            "partial_refund",
            "partial_chargeback",
        ],
        "canceled" => ["deny", "cancel", "expire", "failure"],
    ];

    public function checkout(Request $request)
    {
        [
            "ticketId" => $ticketId,
            "amount" => $amount, 
            "method" => $method
        ] = $request->validate([
            'ticketId' => ['required', 'integer', 'min:1'],
            'amount' => ['required', 'numeric', 'min:1'],
            'method' => ['required', 'string', 'in:midtrans,cash']
        ]);

        $tenantUser = Auth::user();
        
        if (!$tenantUser->booth) {
            return abort(400, "User does not have an assigned booth.");
        }
        
        $boothId = $tenantUser->booth->id;

        if ($method == "midtrans") {
            $result = self::payMidtrans($boothId, $ticketId, $amount);
            return response()->json($result);
        } else if ($method == "cash") {
            $orderId = self::payCash($boothId, $ticketId, $amount);
            return response()->json(["orderId" => $orderId]);
        }
    }

    public static function payMidtrans($boothId, $ticketId, $amount): array
    {
        // Use nested eager loading to get the event and its owner in optimized queries
        $ticket = Ticket::with('event.owner')->find($ticketId); 
        
        if ($ticket == null) {
            throw new Exception("Ticket not found");
        }

        if (!$ticket->event || !$ticket->event->owner) {
            throw new Exception("Event or Event Organizer structure is missing");
        }

        // Access the owner ID through the event relationship chain
        $eoUserId = $ticket->event->owner->id; 
        self::setupLibrary($eoUserId);

        $orderId = "TICKET-" . bin2hex(random_bytes(6));
        $grandTotal = $amount * $ticket->price;

        $params = array(
            'transaction_details' => array(
                'order_id' => $orderId,
                'gross_amount' => $grandTotal,
            )
        );

        $paymentUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;

        TicketPayment::create([
            "id" => $orderId,
            "payment_method" => "midtrans",
            "payment_url" => $paymentUrl,
            "booth_id" => $boothId,
            "ticket_id" => $ticketId,
            "amount" => $amount,
            "price" => $ticket->price,
            "grand_total" => $grandTotal,
            "status" => "pending",
            "description" => $ticket->description ?? "Ticket Purchase"
        ]);

        BoothTicket::updateOrCreate(
            [
                "booth_id" => $boothId,
                "event_id" => $ticket->event_id
            ],
            [
                "status" => "pending"
            ]
        );

        return [
            "orderId" => $orderId,
            "paymentUrl" => $paymentUrl
        ];
    }

    public static function payCash($boothId, $ticketId, $amount): string
    {
        $ticket = Ticket::find($ticketId);
        if ($ticket == null) {
            throw new Exception("Ticket not found");
        }

        $orderId = bin2hex(random_bytes(10));
        $grandTotal = $amount * $ticket->price;

        TicketPayment::create([
            "id" => $orderId,
            "payment_method" => "cash",
            "booth_id" => $boothId,
            "ticket_id" => $ticketId,
            "amount" => $amount,
            "price" => $ticket->price,
            "grand_total" => $grandTotal,
            "status" => "completed",
            "description" => $ticket->description ?? "Ticket Purchase"
        ]);

        BoothTicket::updateOrCreate(
            [
                "booth_id" => $boothId,
                "event_id" => $ticket->event_id
            ],
            [
                "status" => "completed"
            ]
        );

        return $orderId;
    }

    public static function checkMidtransPaymentStatus($eoUserId, $orderId): array
    {
        self::setupLibrary($eoUserId);

        $receipt = TicketPayment::with('ticket')->find($orderId);
        $status = "pending";
        $info = [];

        try {
            $result = \Midtrans\Transaction::status($orderId);
            $resultStatus = $result->fraud_status == 'deny' ? "deny" : $result->transaction_status;

            foreach (self::$statusMap as $statusMapKey => $subStatuses) {
                if (in_array($resultStatus, $subStatuses)) {
                    $status = $statusMapKey;
                    break;
                }
            }

            if ($receipt->status != $status) {
                $receipt->status = $status;
                $receipt->save();

                if ($receipt->ticket) {
                    BoothTicket::where('booth_id', $receipt->booth_id)
                        ->where('event_id', $receipt->ticket->event_id)
                        ->update(['status' => $status]);
                }
            }
        } catch (Exception $e) {
            if ($receipt->status != "pending") {
                throw $e;
            }
        }

        if ($status == "pending") {
            $info = [
                "paymentUrl" => $receipt->payment_url
            ];
        }

        return ["status" => $status, "info" => $info];
    }

    private static function setupLibrary($eoUserId)
    {
        $eoUser = User::with('midtransConfig')->findOrFail($eoUserId);
        $midtransConfig = $eoUser->midtransConfig;

        if ($midtransConfig == null) {
            throw new Exception("Event Organizer hasn't set up their Midtrans key yet");
        }

        \Midtrans\Config::$serverKey = $midtransConfig->server_key;
        \Midtrans\Config::$isProduction = false;
    }

    public function checkPaymentStatus(string $orderId)
    {
        $output = new ConsoleOutput();
        try {
            // 1. Find the transaction record with its nested relationships
            $payment = TicketPayment::with('ticket.event.owner')->findOrFail($orderId);
            
            // 2. Extract the Event Organizer's user ID to load their specific Midtrans keys
            $eoUserId = $payment->ticket->event->owner->id;

            // 3. Query Midtrans for the live API status update
            $status = TicketPaymentController::checkMidtransPaymentStatus($eoUserId, $orderId);
            
            // 4. Render the customized ticket payment page with the array results
            return Inertia::render('Event/CheckPaymentStatus', $status);
            
        } catch (Exception $e) {
            $output->writeln("Error when trying to check for ticket payment status, message:");
            $output->writeln($e->getCode() . " " . $e->getMessage());
            
            // Render fallback failure visual block
            return Inertia::render('Event/CheckPaymentStatus', ["status" => "error"]);
        }
    }
}