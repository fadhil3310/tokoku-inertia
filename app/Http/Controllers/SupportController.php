<?php

namespace App\Http\Controllers;

use App\Email\SendEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Support");
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
            'fullName'        => 'required|string|max:255',
            'email'        => 'required|email',
            'category'        => 'required|string|max:255',
            'description'        => 'required|string|max:500',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('support', 'public');
        }

        $result = SendEmail::Send($validated['fullName'], $validated['email'], $validated['category'], $validated['description'], $validated['image']);

        if ($result) {
            Inertia::flash([
                'status' => 'success',
                'message' => 'Your issue successfully sent!'
            ]);
        } else {
            Inertia::flash([
                'status' => 'failed',
                'message' => "There's something wrong when we try to send your issue"
            ]);
        }

        return redirect()->route('support.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
