<?php

namespace App\Http\Controllers;

use App\Models\Booth;
use App\Models\Event;
use App\Models\ProductPayment;
use App\Models\TicketPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // ==========================================
        // 1. TENANT DASHBOARD
        // ==========================================
        if ($user->role === 'tenant') {
            // Get the user's booth (assuming User hasOne Booth)
            $booth = $user->booth; 
            
            $totalProducts = 0;
            $recentTransactions = collect();

            if ($booth) {
                $totalProducts = $booth->products()->count();

                // Assuming ProductPayment belongsTo Product, and Product belongsTo Booth
                $recentTransactions = ProductPayment::whereHas('product', function ($query) use ($booth) {
                        $query->where('booth_id', $booth->id);
                    })
                    ->with('product') // Eager load product details for the frontend
                    ->latest()
                    ->take(5)
                    ->get();
            }

            return Inertia::render('Dashboard/Tenant', [
                'booth'              => $booth,
                'totalProducts'      => $totalProducts,
                'recentTransactions' => $recentTransactions,
            ]);
        }

        // ==========================================
        // 2. EVENT ORGANIZER DASHBOARD
        // ==========================================
        if ($user->role === 'event organizer') {
            // Get the EO's most recently created event
            $recentEvent = $user->events()->latest()->first();

            $totalRevenue = 0;
            $totalBoothSpaceSold = 0;

            if ($recentEvent) {
                // Assuming TicketPayment belongsTo Ticket/Event
                // Adjust this query based on how your TicketPayment table references the Event
                $totalRevenue = TicketPayment::whereHas('ticket', function ($query) use ($recentEvent) {
                        $query->where('event_id', $recentEvent->id);
                    })
                    ->where('status', 'paid') // Good practice to only count successful payments
                    ->sum('amount');

                // Assuming a ticket payment represents a sold booth space/ticket
                $totalBoothSpaceSold = TicketPayment::whereHas('ticket', function ($query) use ($recentEvent) {
                        $query->where('event_id', $recentEvent->id);
                    })
                    ->where('status', 'paid')
                    ->count();
            }

            return Inertia::render('Dashboard/EventOrganizer', [
                'recentEvent'         => $recentEvent,
                'totalRevenue'        => $totalRevenue,
                'totalBoothSpaceSold' => $totalBoothSpaceSold,
            ]);
        }

        abort(403, 'Unauthorized dashboard access.');
    }
}