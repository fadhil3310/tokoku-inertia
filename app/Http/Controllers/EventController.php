<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }

    public function detail($id)
    {
        $event = Event::with(['owner', 'tickets'])->find($id);

        if (!$event) {
            return Inertia::render('Event/Detail', [
                'event' => null
            ]);
        }

        $startDate = Carbon::parse($event->date_start);
        $endDate = Carbon::parse($event->date_end);

        $cardDate = $startDate->format('d') . ' - ' . $endDate->format('d M Y');
        $cardTime = $startDate->format('H:i') . ' - ' . $endDate->format('H:i') . ' WIB';

        $minPrice = $event->tickets->min('price');

        $eventData = [
            'id'            => $event->id,
            'name'          => $event->name,
            'description'   => $event->description,
            'image'         => $event->poster ?? $event->image,
            'venue'         => $event->location,
            
            'terms'         => is_array($event->terms) ? $event->terms : array_filter(explode("\n", $event->terms)),
            
            'cardDate'      => $cardDate,
            'cardTime'      => $cardTime,
            'organizerName' => $event->owner->name ?? 'Unknown Organizer',
            // Return formatted string if price exists, otherwise null
            'price'         => !is_null($minPrice) ? 'Rp' . number_format($minPrice, 0, ',', '.') : null,
        ];

        return Inertia::render('Event/Detail', [
            'event' => $eventData
        ]);
    }
}
