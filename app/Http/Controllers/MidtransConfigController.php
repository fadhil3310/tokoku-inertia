<?php

namespace App\Http\Controllers;

use App\Models\MidtransConfig;
use App\Models\Booth;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Symfony\Component\Console\Output\ConsoleOutput;

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

    public function store(Request $request)
    {
        $values = $request->validate([
            'server_key' => ['required', 'string', 'max:255'],
            'client_key' => ['required', 'string', 'max:255'],
        ], [
            'server_key.required' => 'Server Key is empty',
            'client_key.required' => 'Client Key is empty',
        ]);

        if (Auth::user()->midtransConfig == null) {
            $values['id'] = Str::uuid();
            $values['user_id'] = Auth::user()->id;
            MidtransConfig::create($values);
        } else {
            Auth::user()->midtransConfig->update($values);
        }

        return Redirect::back();
    }

    public static function checkReady($boothId)
    {
        $config = Booth::find($boothId)->owner->midtransConfig;
        if ($config == null)
            return false;
        if ($config->server_key == "")
            return false;
        return true;
    }
}
