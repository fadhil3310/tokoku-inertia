<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\ProductPayment;
use App\Models\TicketPayment;
use App\Models\User;
use App\Models\Booth;
use Symfony\Component\Console\Output\ConsoleOutput;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $output = new ConsoleOutput();
        $user = Auth::user();

        // ==========================================
        // 1. TENANT DASHBOARD
        // ==========================================
        if ($user->role === 'tenant') {
            $booth = $user->booth;

            $startOfToday = now()->startOfDay();
            $endOfToday   = now()->endOfDay();

            $startOfYesterday = now()->subDay()->startOfDay();
            $endOfYesterday   = now()->subDay()->endOfDay();

            $todayRevenue = ProductPayment::whereBetween('created_at', [$startOfToday, $endOfToday])
                ->sum('grand_total'); // Updated to use grand_total column directly

            $todayCount = ProductPayment::whereBetween('created_at', [$startOfToday, $endOfToday])
                ->count();


            $yesterdayRevenue = ProductPayment::whereBetween('created_at', [$startOfYesterday, $endOfYesterday])
                ->sum('grand_total'); // Updated to use grand_total column directly

            $yesterdayCount = ProductPayment::whereBetween('created_at', [$startOfYesterday, $endOfYesterday])
                ->count();


            // Revenue Percentage Change
            $revenueChange = 0;
            if ($yesterdayRevenue > 0) {
                $revenueChange = (($todayRevenue - $yesterdayRevenue) / $yesterdayRevenue) * 100;
            } elseif ($todayRevenue > 0) {
                $revenueChange = 100;
            }

            // Transaction Volume Percentage Change
            $countChange = 0;
            if ($yesterdayCount > 0) {
                $countChange = (($todayCount - $yesterdayCount) / $yesterdayCount) * 100;
            } elseif ($todayCount > 0) {
                $countChange = 100;
            }

            $recentPayments = ProductPayment::join('products', 'product_payments.product_id', '=', 'products.id')
                ->select([
                    'product_payments.id',
                    'product_payments.grand_total',
                    'product_payments.created_at',
                    'product_payments.payment_method',
                    'product_payments.status',
                    'products.name as product_name', // Pulling the product name
                ])
                ->latest('product_payments.created_at') // Specify table name to avoid ambiguity
                ->limit(3)
                ->get();

            return Inertia::render('Dashboard/Index', [
                'user'               => $user,
                'booth'              => $booth,
                'stats' => [
                    'revenue' => [
                        'today' => (float) $todayRevenue,
                        'yesterday' => (float) $yesterdayRevenue,
                        'percentageChange' => round($revenueChange, 2),
                    ],
                    'orders' => [
                        'today' => $todayCount,
                        'yesterday' => $yesterdayCount,
                        'percentageChange' => round($countChange, 2),
                    ],
                    'recentPayments' => $recentPayments
                ]
            ]);
        }

        // ==========================================
        // 2. EVENT ORGANIZER DASHBOARD
        // ==========================================
        if ($user->role === 'event organizer') {
            $recentEvent = Event::where('owner_id', $user->id)->latest()->first();

            $totalRevenueRaw = 0;
            $totalBoothSpaceSold = 0;
            $formattedRevenue = '0';

            if ($recentEvent) {
                // FIXED: Get the records, eager load the ticket, and sum the prices
                $totalRevenueRaw = TicketPayment::with('ticket')
                    ->whereHas('ticket', function ($query) use ($recentEvent) {
                        $query->where('event_id', $recentEvent->id);
                    })
                    ->where('status', 'paid')
                    ->get()
                    ->sum(function ($payment) {
                        // If users can buy multiple tickets per payment, change this to:
                        // return $payment->ticket->price * $payment->quantity;
                        return $payment->ticket->price;
                    });

                $totalBoothSpaceSold = TicketPayment::whereHas('ticket', function ($query) use ($recentEvent) {
                    $query->where('event_id', $recentEvent->id);
                })
                    ->where('status', 'paid')
                    ->count();
            }

            // Format revenue to IDR format (e.g. "120.000")
            $formattedRevenue = number_format($totalRevenueRaw, 0, ',', '.');

            return Inertia::render('Dashboard/Index', [
                'user'                => $user,
                'recentEvent'         => $recentEvent,
                'totalRevenue'        => $formattedRevenue,
                'totalBoothSpaceSold' => $totalBoothSpaceSold,
            ]);
        }

        // ==========================================
        // 3. ADMIN DASHBOARD

        if ($user->role === 'admin') {
            $totalUsers = User::count();
            $totalTenants = User::where('role', 'tenant')->count();
            $totalEventOrganizers = User::where('role', 'event organizer')->count();
            $totalEvents = Event::count();
            $totalBooths = Booth::count();
            $totalPaidTickets = TicketPayment::where('status', 'paid')->count();
            $totalRevenue = TicketPayment::with('ticket')
                ->where('status', 'paid')
                ->get()
                ->sum(function ($payment) {
                    return $payment->ticket?->price ?? 0;
                });

            $recentEvents = Event::latest()
                ->take(5)
                ->get();

            $recentTicketPayments = TicketPayment::latest()
                ->take(10)
                ->get();

            return Inertia::render('Dashboard/Index', [
                'user' => $user,

                'stats' => [
                    'totalUsers' => $totalUsers,
                    'totalTenants' => $totalTenants,
                    'totalEventOrganizers' => $totalEventOrganizers,
                    'totalEvents' => $totalEvents,
                    'totalBooths' => $totalBooths,
                    'totalPaidTickets' => $totalPaidTickets,
                    'totalRevenue' => number_format($totalRevenue, 0, ',', '.'),
                ],

                'recentEvents' => $recentEvents,
                'recentTicketPayments' => $recentTicketPayments,
            ]);
        }

        abort(403, 'Unauthorized dashboard access.');
    }
}
