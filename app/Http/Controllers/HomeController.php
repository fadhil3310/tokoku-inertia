<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $upcomingEvents = Event::query()
            ->where('visibility', 'public')
            ->where('date_end', '>=', now())
            ->orderBy('date_start')
            ->take(4)
            ->get()
            ->map(function ($event) {
                $start = Carbon::parse($event->date_start);
                $end = Carbon::parse($event->date_end);

                return [
                    'id' => $event->id,
                    'title' => $event->name,
                    'description' => $event->description,

                    'date' => $start->month === $end->month
                        ? $start->format('M d') . ' - ' . $end->format('d, Y')
                        : $start->format('M d') . ' - ' . $end->format('M d, Y'),

                    'city' => $event->location,
                    'image' => $event->getPoster(),
                ];
            });

        $pastEvents = Event::query()
            ->where('visibility', 'public')
            ->where('date_end', '<', now())
            ->orderByDesc('date_end')
            ->take(4)
            ->get()
            ->map(function ($event) {
                $start = Carbon::parse($event->date_start);
                $end = Carbon::parse($event->date_end);

                return [
                    'id' => $event->id,
                    'title' => $event->name,
                    'description' => $event->description,

                    'date' => $start->month === $end->month
                        ? $start->format('M d') . ' - ' . $end->format('d, Y')
                        : $start->format('M d') . ' - ' . $end->format('M d, Y'),

                    'city' => $event->location,
                    'image' => $event->poster,
                ];
            });

        return Inertia::render('Home', [
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents,
        ]);
    }
}