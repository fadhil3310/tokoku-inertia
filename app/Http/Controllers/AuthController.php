<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booth;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'  => ['required', 'string', 'min:8', 'confirmed'],
            'role'      => ['required', 'string', 'in:tenant,event_organizer'],
            'redirect'  => ['nullable', 'integer'],
            // Conditionally require boothName if role is tenant
            'boothName' => ['required_if:role,tenant', 'nullable', 'string', 'max:255'],
            'boothIcon' => ['nullable', 'image', 'max:2048'],
        ]);

        DB::transaction(function () use ($validated, $request) {
            $user = User::create([
                'name'     => $validated['name'],
                'email'    => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role'     => $validated['role'], 
            ]);

            if ($validated['role'] === 'tenant') {
                $imagePath = null;
                if ($request->hasFile('boothIcon')) {
                    $imagePath = $request->file('boothIcon')->store('booths', 'public');
                }

                Booth::create([
                    'id'       => Str::uuid(), // Generating UUID manually (omit if Booth model HasUuids trait)
                    'name'     => $validated['boothName'],
                    'owner_id' => $user->id,
                    'image'    => $imagePath,
                ]);
            } elseif ($validated['role'] === 'event_organizer') {
                $planId = 1; 

                Subscription::create([
                    'user_id'    => $user->id,
                    'plan_id'    => $planId,
                    'start_date' => now(),
                    'end_date'   => now()->addDays(14), // 14 days trial
                    'status'     => 'active',
                ]);
            }

            Auth::login($user);
        });

        // 3. Redirect logic
        if ($request->filled('redirect')) {
            return redirect('/join/event/' . $request->redirect);
        }

        return redirect('/dashboard');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}