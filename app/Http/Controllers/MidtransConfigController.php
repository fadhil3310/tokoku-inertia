<?php

namespace App\Http\Controllers;

use App\Models\MidtransConfig;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Symfony\Component\Console\Output\ConsoleOutput;

class MidtransConfigController extends Controller
{
    private static $isLibraryInitialized = false;

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

        \Midtrans\Config::$serverKey = $values['server_key'];

        return Redirect::back();
    }

    public static function checkLibraryReady()
    {
        $output = new ConsoleOutput();
        if (!MidtransConfigController::$isLibraryInitialized) 
            return false;

        $config = Auth::user()->midtransConfig;
        if ($config == null)
            return false;

        $output->writeln('Check Midtrans is ready? ' . MidtransConfigController::$isLibraryInitialized . " " . $config);

        \Midtrans\Config::$serverKey = $config['server_key'];
        \Midtrans\Config::$isProduction = false;

        MidtransConfigController::$isLibraryInitialized = true;
    }
}
