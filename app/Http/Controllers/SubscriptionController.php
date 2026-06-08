<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Subscription;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Symfony\Component\Console\Output\ConsoleOutput;

class SubscriptionController extends Controller
{
    private static array $statusMap = [
        "pending" => ["pending"],
        "completed" => [
            "capture",
            "settlement",
        ],
        "canceled" => ["deny", "cancel", "expire", "failure"],
    ];

    /**
     * Display the subscription management dashboard view.
     */
    public function index()
    {
        $user = Auth::user();

        // Fetch all plans available in the database
        $plans = Plan::all();

        // Fetch the user's latest subscription history details
        $currentSubscription = Subscription::with('plan')
            ->where('user_id', $user->id)
            ->latest()
            ->first();

        $formattedSubscription = null;
        if ($currentSubscription) {
            $formattedSubscription = [
                'id' => $currentSubscription->id,
                'plan_id' => $currentSubscription->plan_id,
                'plan_name' => $currentSubscription->plan->name ?? 'Unknown Tier',
                'status' => $currentSubscription->status,
                'start_date' => $currentSubscription->start_date ? Carbon::parse($currentSubscription->start_date)->format('d M Y') : '-',
                'end_date' => $currentSubscription->end_date ? Carbon::parse($currentSubscription->end_date)->format('d M Y') : '-',
                'is_expired' => $currentSubscription->status === 'expired' || ( $currentSubscription->end_date && Carbon::parse($currentSubscription->end_date)->isPast() ),
            ];
        }

        return Inertia::render('Subscription/Index', [
            'plans' => $plans,
            'currentSubscription' => $formattedSubscription
        ]);
    }

    /**
     * Handle subscription payment checkout creation.
     */
    public function checkout(Request $request)
    {
        [
            "planId" => $planId,
            "method" => $method
        ] = $request->validate([
            'planId' => ['required', 'integer', 'min:1'],
            'method' => ['required', 'string', 'in:midtrans']
        ]);

        $userId = Auth::id();

        if ($method == "midtrans") {
            $result = self::payMidtrans($userId, $planId);
            return response()->json($result);
        }

        return abort(400, "Unsupported payment method configuration.");
    }

    public static function payMidtrans($userId, $planId): array
    {
        self::setupLibrary();

        $plan = Plan::find($planId);
        if ($plan == null) {
            throw new Exception("Subscription plan profile not found");
        }

        // 1. Create a pending subscription log entry first to grab an ID reference
        $subscription = Subscription::create([
            "user_id" => $userId,
            "plan_id" => $planId,
            "status" => "pending",
            "start_date" => null,
            "end_date" => null,
        ]);

        // 2. Generate a compound string for Midtrans' order_id to easily decode the ID later
        $orderId = "SUB-" . $subscription->id . "-" . bin2hex(random_bytes(3));
        $grandTotal = $plan->price;

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grandTotal,
            ]
        ];

        // Get Snap Payment Page URL
        $paymentUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;

        return [
            "orderId" => $orderId,
            "paymentUrl" => $paymentUrl
        ];
    }

    /**
     * Live processing checks for checking external payment updates.
     */
    public static function checkMidtransPaymentStatus($orderId): array
    {
        self::setupLibrary();

        $parts = explode('-', $orderId);
        if (count($parts) < 3) {
            throw new Exception("Invalid order tracking ID formatting template supplied.");
        }
        $subscriptionId = $parts[1];

        $subscription = Subscription::with('plan')->find($subscriptionId);
        if (!$subscription) {
            throw new Exception("Subscription log record not found.");
        }

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

            // Sync the payment status logic into the membership profile window parameters
            if ($subscription->status != $status) {
                if ($status === "completed") {
                    
                    // Look for any existing active/completed plan stretching furthest into the future
                    $furthestActiveSubscription = Subscription::where('user_id', $subscription->user_id)
                        ->whereIn('status', ['active', 'completed'])
                        ->where('id', '!=', $subscription->id)
                        ->where('end_date', '>', Carbon::now())
                        ->orderBy('end_date', 'desc')
                        ->first();

                    if ($furthestActiveSubscription) {
                        // SCENARIO A: Stack dynamically on top of the existing expiry timeline
                        $subscription->start_date = $furthestActiveSubscription->end_date;
                        $subscription->end_date = Carbon::parse($furthestActiveSubscription->end_date)->addDays($subscription->plan->duration_days);
                    } else {
                        // SCENARIO B: Clean start from current date (old subscription was in the past or doesn't exist)
                        $subscription->start_date = Carbon::now();
                        $subscription->end_date = Carbon::now()->addDays($subscription->plan->duration_days);
                    }

                    $subscription->status = "active";
                } elseif ($status === "canceled") {
                    $subscription->status = "cancelled";
                } else {
                    $subscription->status = $status;
                }
                $subscription->save();
            }
        } catch (Exception $e) {
            if ($subscription->status != "pending") {
                throw $e;
            }
        }

        return ["status" => $status, "info" => $info];
    }

    /**
     * Inertia page render layer evaluating payment responses.
     */
    public function checkPaymentStatus(string $orderId)
    {
        $output = new ConsoleOutput();
        try {
            $status = self::checkMidtransPaymentStatus($orderId);
            return Inertia::render('Subscription/CheckPaymentStatus', $status);
        } catch (Exception $e) {
            $output->writeln("Error when trying to evaluate active subscription confirmation status details:");
            $output->writeln($e->getCode() . " " . $e->getMessage());
            return Inertia::render('Subscription/CheckPaymentStatus', ["status" => "error"]);
        }
    }

    private static function setupLibrary()
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key') ?? env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = false;
    }
}