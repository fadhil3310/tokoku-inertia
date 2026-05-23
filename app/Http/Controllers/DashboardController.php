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
            return response()->json($booth);

            
            $totalProducts = 0;
            // $recentTransactions = collect();

            if ($booth) {
                $totalProducts = $booth->products()->count();

                // Assuming ProductPayment belongsTo Product, and Product belongsTo Booth
                // $recentTransactions = ProductPayment::whereHas('product', function ($query) use ($booth) {
                //         $query->where('booth_id', $booth->id);
                //     })
                //     ->with('product') // Eager load product details for the frontend
                //     ->latest()
                //     ->take(5)
                //     ->get();
            }
                $recentTransactions = null;
                
            return Inertia::render('Dashboard/Tenant', [
                'booth'              => $booth,
                'totalProducts'      => $totalProducts,
                'recentTransactions' => $recentTransactions,
            ]);
        }

        if ($user->role === 'event organizer') {
            $recentEvent = null;

            $totalRevenueRaw = 0;
            $totalBoothSpaceSold = 0;
            $formattedRevenue = 0;

            // if ($recentEvent) {
            //     $totalRevenueRaw = TicketPayment::whereHas('ticket', function ($query) use ($recentEvent) {
            //             $query->where('event_id', $recentEvent->id);
            //         })
            //         ->where('status', 'paid') 
            //         ->sum('amount');

            //     $totalBoothSpaceSold = TicketPayment::whereHas('ticket', function ($query) use ($recentEvent) {
            //             $query->where('event_id', $recentEvent->id);
            //         })
            //         ->where('status', 'paid')
            //         ->count();
            // }

            // Format revenue to IDR format (e.g. "120.000")
            // $formattedRevenue = number_format($totalRevenueRaw, 0, ',', '.');

            return Inertia::render('Dashboard/EventOrganizer', [
                'recentEvent'         => $recentEvent,
                'totalRevenue'        => $formattedRevenue, // Sent formatted so frontend can just prefix 'Rp'
                'totalBoothSpaceSold' => $totalBoothSpaceSold,
            ]);
        }

        abort(403, 'Unauthorized dashboard access.');
    }
}