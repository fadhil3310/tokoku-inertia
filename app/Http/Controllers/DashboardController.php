<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\ProductPayment;
use App\Models\TicketPayment;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // ==========================================
        // 1. TENANT DASHBOARD
        // ==========================================
        if ($user->role === 'tenant') {
            $booth = $user->booth; 
            
            $totalProducts = 0;
            $recentTransactions = collect();

            // if ($booth) {
            //     $totalProducts = $booth->products()->count();

            //     $recentTransactions = ProductPayment::whereHas('product', function ($query) use ($booth) {
            //             $query->where('booth_id', $booth->id);
            //         })
            //         ->with('product') 
            //         ->latest()
            //         ->take(5)
            //         ->get();
            // }
                
            return Inertia::render('Dashboard/Index', [
                'user'               => $user,
                'booth'              => $booth,
                'totalProducts'      => $totalProducts,
                'recentTransactions' => $recentTransactions,
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

        abort(403, 'Unauthorized dashboard access.');
    }
}