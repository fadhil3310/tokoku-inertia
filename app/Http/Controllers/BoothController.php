<?php

namespace App\Http\Controllers;

use App\Models\Booth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class BoothController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boothId = Booth::where('owner_id', Auth::user()->id)->first()->id;
        $booth = Booth::findOrFail($boothId);
        
        return Inertia::render('Booth', [
            'booth' => $booth,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Booth $booth)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booth $booth)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $boothId)
    {
        $booth = Booth::findOrFail($boothId);

        $rules = [
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string|max:255',
            'email'         => 'nullable|string|max:255',
            'phone'         => 'nullable|string|max:255',     
            'instagram'     => 'nullable|string|max:255',     
            'twitter'       => 'nullable|string|max:255',     
        ];

        if ($request->image != $booth->image) {
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg|max:2048';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('image') && ($request->image != $booth->image)) {
            if ($booth->image && File::exists(public_path($booth->image))) {
                File::delete(public_path($booth->image));
            }

            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images/booth'), $imageName);
            $validated['image'] = '/images/booth/' . $imageName;
        }

        $booth->update($validated);

        Inertia::flash([
            'status' => 'success',
            'message' => 'Booth updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booth $booth)
    {
        //
    }
}
