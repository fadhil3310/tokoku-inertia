<?php

namespace App\Http\Controllers;

use App\Models\MidtransConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class MidtransConfigController extends Controller
{
    public function index()
    {
        $config = Auth::user()->midtransConfig;

        return Inertia::render('MidtransConfig', [
            'serverKey' => $config['server_key'] ?? "",
            'clientKey' => $config['client_key'] ?? "",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $values = $request->validate([
            'server_key' => ['required', 'string', 'max:255'],
            'client_key' => ['required', 'string', 'max:255'],
        ], [
            'server_key.required' => 'Server Key is empty',
            'client_key.required' => 'Client Key is empty',
        ]);
        
        if (Auth::user()->midtransConfig == null) 
        {
            $values['id'] = Str::uuid();
            $values['user_id'] = Auth::user()->id;
            MidtransConfig::create($values);
        } 
        else 
        {
            Auth::user()->midtransConfig->update($values);
        }

        return Redirect::back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MidtransConfig $midtransConfig)
    {
        //
    }
}
