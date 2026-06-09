<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        $search = $req->query('search');
        $status = $req->query('status');

        $events = Event::where('owner_id', auth()->id())
            ->where('name', 'like', "%{$search}%")
            ->when($status, function ($query) use ($status){
                if ($status == 'upcoming') {
                    return $query->where('date_end', '>=', now());
                }
                else if ($status == 'past') {
                    return $query->where('date_end', '<', now());
                }
            })
            ->latest()
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'name' => $event->name,
                    'date_start' => $event->date_start->format('d M Y, H:i'),
                    'date_end' => $event->date_end->format('d M Y, H:i'),
                ];
            });

        return Inertia::render('Event/Index', [
            'events' => $events,
        ]);
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'terms' => 'nullable|array',
            'terms.*' => 'string',
            'date_start' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_start',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'location' => 'nullable|string|max:255',
            'coordinates' => 'nullable|string|max:255',
            'map' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'contact' => 'nullable|string|max:255',
            'max_participants' => 'nullable|integer|min:1',
            'visibility' => 'required|in:public,unlisted,private',
            
            // Nested Tickets Validation
            'tickets' => 'required|array|min:1',
            'tickets.*.name' => 'required|string|max:255',
            'tickets.*.price' => 'required|numeric|min:0',
            'tickets.*.description' => 'nullable|string',
            'tickets.*.location' => 'nullable|string|max:255',
            'tickets.*.coordinates' => 'nullable|string|max:255',
            'tickets.*.map' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        DB::transaction(function () use ($validated, $request) {
            
            $posterPath = $request->hasFile('poster') 
                ? $request->file('poster')->store('events/posters', 'public') 
                : null;
                
            $mapPath = $request->hasFile('map') 
                ? $request->file('map')->store('events/maps', 'public') 
                : null;

            $event = Event::create([
                'owner_id' => auth()->id(),
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'terms' => $validated['terms'] ?? null,
                'date_start' => $validated['date_start'],
                'date_end' => $validated['date_end'],
                'poster' => $posterPath,
                'location' => $validated['location'] ?? null,
                'coordinates' => $validated['coordinates'] ?? null,
                'map' => $mapPath,
                'contact' => $validated['contact'] ?? null,
                'max_participants' => $validated['max_participants'] ?? null,
                'visibility' => $validated['visibility'],
            ]);

            // Create the Tickets
            foreach ($validated['tickets'] as $index => $ticketData) {
                
                $ticketMapPath = null;
                
                if ($request->hasFile("tickets.{$index}.map")) {
                    $ticketMapPath = $request->file("tickets.{$index}.map")->store('tickets/maps', 'public');
                }

                $event->tickets()->create([
                    'name' => $ticketData['name'],
                    'description' => $ticketData['description'] ?? null,
                    'price' => $ticketData['price'],
                    'location' => $ticketData['location'] ?? null,
                    'coordinates' => $ticketData['coordinates'] ?? null,
                    'map' => $ticketMapPath,
                ]);
            }
        });

        return redirect()->route('events.index')->with('success', 'Event and tickets created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Fetch event with its related tickets and owner (organizer)
        $event = Event::with(['tickets', 'owner'])->findOrFail($id);

        // Format the data perfectly for the React component
        $formattedEvent = [
            'id' => $event->id,
            'name' => $event->name,
            'description' => $event->description,
            'terms' => $event->terms, // Assuming this is cast to an array in the Model
            'venue' => $event->location ?: 'Location TBD',
            'image' => $event->getPoster(), // Using the method created earlier
            'map_url' => $event->getMap(),
            'cardDate' => Carbon::parse($event->date_start)->format('d M Y'),
            'cardTime' => Carbon::parse($event->date_start)->format('H:i') . ' - ' . Carbon::parse($event->date_end)->format('H:i'),
            'organizerName' => $event->owner->name ?? 'Unknown Organizer',
            'hasEnded'      => Carbon::parse($event->date_end)->isPast(),
            // Map tickets to include their specific maps
            'tickets' => $event->tickets->map(function($ticket) {
                return [
                    'id' => $ticket->id,
                    'name' => $ticket->name,
                    'description' => $ticket->description,
                    'price' => $ticket->price,
                    'location' => $ticket->location,
                    'map_url' => empty($ticket->map) ? null : (str_starts_with($ticket->map, 'http') ? $ticket->map : asset('storage/' . $ticket->map)),
                ];
            }),
            // Get the lowest price for the "Starts From" label
            'min_price' => $event->tickets->min('price'),
        ];

        return Inertia::render('Event/Join', [
            'event' => $formattedEvent
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $event = Event::with('tickets')
            ->where('owner_id', auth()->id())
            ->findOrFail($id);

        // Format dates for the <input type="datetime-local"> element
        $event->date_start_formatted = $event->date_start ? $event->date_start->format('Y-m-d\TH:i') : null;
        $event->date_end_formatted = $event->date_end ? $event->date_end->format('Y-m-d\TH:i') : null;

        // Append full image URLs
        $event->poster_url = $event->getPoster();
        $event->map_url = $event->getMap();

        // Map through tickets to append their image URLs
        $event->tickets->transform(function ($ticket) {
            // Assumes you add a getMap() method to your Ticket model similar to the Event model
            $ticket->map_url = empty($ticket->map) ? null : (str_starts_with($ticket->map, 'http') ? $ticket->map : asset('storage/' . $ticket->map));
            return $ticket;
        });

        return Inertia::render('Event/Form', [
            'event' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $event = Event::where('id', $id)
            ->where('owner_id', auth()->id())
            ->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'terms' => 'nullable|array',
            'terms.*' => 'string',
            'date_start' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_start',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'location' => 'nullable|string|max:255',
            'coordinates' => 'nullable|string|max:255',
            'map' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'contact' => 'nullable|string|max:255',
            'max_participants' => 'nullable|integer|min:1',
            'visibility' => 'required|in:public,unlisted,private',
            
            // Nested Tickets Validation
            'tickets' => 'required|array|min:1',
            'tickets.*.id' => 'nullable', // Allow ID to exist so we know if we are updating or creating
            'tickets.*.name' => 'required|string|max:255',
            'tickets.*.price' => 'required|numeric|min:0',
            'tickets.*.description' => 'nullable|string',
            'tickets.*.location' => 'nullable|string|max:255',
            'tickets.*.coordinates' => 'nullable|string|max:255',
            'tickets.*.map' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        DB::transaction(function () use ($validated, $request, $event) {
            
            // --- HANDLE EVENT FILES ---
            $posterPath = $event->poster;
            if ($request->hasFile('poster')) {
                if ($event->poster) Storage::disk('public')->delete($event->poster);
                $posterPath = $request->file('poster')->store('events/posters', 'public');
            }
                
            $mapPath = $event->map;
            if ($request->hasFile('map')) {
                if ($event->map) Storage::disk('public')->delete($event->map);
                $mapPath = $request->file('map')->store('events/maps', 'public');
            }

            // --- UPDATE EVENT ---
            $event->update([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'terms' => $validated['terms'] ?? null,
                'date_start' => $validated['date_start'],
                'date_end' => $validated['date_end'],
                'poster' => $posterPath,
                'location' => $validated['location'] ?? null,
                'coordinates' => $validated['coordinates'] ?? null,
                'map' => $mapPath,
                'contact' => $validated['contact'] ?? null,
                'max_participants' => $validated['max_participants'] ?? null,
                'visibility' => $validated['visibility'],
            ]);

            // --- HANDLE TICKETS ---
            $incomingTicketIds = collect($validated['tickets'])
                ->pluck('id')
                ->filter(fn ($id) => is_numeric($id))
                ->toArray();

            $ticketsToDelete = $event->tickets()->whereNotIn('id', $incomingTicketIds)->get();
            foreach ($ticketsToDelete as $ticket) {
                if ($ticket->map) Storage::disk('public')->delete($ticket->map);
                $ticket->delete();
            }

            foreach ($validated['tickets'] as $index => $ticketData) {
                
                $ticketId = $ticketData['id'] ?? null;
                $ticket = is_numeric($ticketId) ? $event->tickets()->find($ticketId) : null;
                
                $ticketMapPath = $ticket ? $ticket->map : null; // Keep existing map by default
                
                if ($request->hasFile("tickets.{$index}.map")) {
                    if ($ticket && $ticket->map) {
                        Storage::disk('public')->delete($ticket->map);
                    }
                    $ticketMapPath = $request->file("tickets.{$index}.map")->store('tickets/maps', 'public');
                }

                if ($ticket) {
                    // Update existing ticket
                    $ticket->update([
                        'name' => $ticketData['name'],
                        'description' => $ticketData['description'] ?? null,
                        'price' => $ticketData['price'],
                        'location' => $ticketData['location'] ?? null,
                        'coordinates' => $ticketData['coordinates'] ?? null,
                        'map' => $ticketMapPath,
                    ]);
                } else {
                    // Create new ticket
                    $event->tickets()->create([
                        'name' => $ticketData['name'],
                        'description' => $ticketData['description'] ?? null,
                        'price' => $ticketData['price'],
                        'location' => $ticketData['location'] ?? null,
                        'coordinates' => $ticketData['coordinates'] ?? null,
                        'map' => $ticketMapPath,
                    ]);
                }
            }
        });

        return redirect()->route('events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $event = Event::where('id', $id)
            ->where('owner_id', auth()->id())
            ->firstOrFail();

        if ($event->poster) {
            Storage::disk('public')->delete($event->poster);
        }
        
        if ($event->map) {
            Storage::disk('public')->delete($event->map);
        }

        foreach ($event->tickets as $ticket) {
            if ($ticket->map) {
                Storage::disk('public')->delete($ticket->map);
            }
        }

        $event->delete();

        return redirect()->route('events.index')->with('success', 'Event and all associated tickets deleted successfully.');
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
            'image'         => $event->getPoster(),
            'venue'         => $event->location,
            'coordinates'   => $event->coordinates,
            
            'terms'         => is_array($event->terms) ? $event->terms : array_filter(explode("\n", $event->terms)),
            
            'cardDate'      => $cardDate,
            'cardTime'      => $cardTime,
            'organizerName' => $event->owner->name ?? 'Unknown Organizer',
            'hasEnded'      => $endDate->isPast(),
            // Return formatted string if price exists, otherwise null
            'price'         => !is_null($minPrice) ? 'Rp' . number_format($minPrice, 0, ',', '.') : null,
        ];

        return Inertia::render('Event/Detail', [
            'event' => $eventData
        ]);
    }

    public function catalog(Request $request, $eventId)
    {
        $search = $request->query('search');
        $category = $request->query('category');

        $event = Event::with('owner')->findOrFail($eventId);

        $query = Product::whereIn('booth_id', function ($query) use ($eventId) {
            $query->select('booth_id')
                ->from('booth_tickets')
                ->where('event_id', $eventId)
                ->where('status', 'completed'); // Optional: ensures only approved/paid booths show items
        })->where('name', 'like', "%{$search}%");

        if (!empty($category)) {
            $query->where('category', $category);
        }

        $products = $query->paginate(10)->through(function ($product) {
            // 1. Convert the model to an array FIRST to keep array signatures consistent
            $data = $product->toArray();
            
            // 2. Overwrite the existing 'image' property with the resolved asset URL
            $data['image'] = $product->image
                ? Storage::url($product->image)
                : 'https://placehold.co/300'; 

            // 3. Return the modified array payload
            return $data;
        });

        return Inertia::render('Catalog/Index', [
            'products' => $products,
            'booth' => null, 
            'event' => [
                "id" => $event->id,
                "name" => $event->name,
                "owner" => $event->owner->name ?? 'Unknown',
                "image" => $event->getPoster(),
                "location" => $event->location ?: 'Location TBD',
                "date" => Carbon::parse($event->date_start)->format('d M Y'),
            ]
        ]);
    }
}
