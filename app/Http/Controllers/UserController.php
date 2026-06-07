<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all(['id', 'name', 'email', 'image', 'created_at'])->
        map(function($user) {
            $user->created_at_humanreadable = $user->created_at->diffForHumans();
            return $user;
            }
        );

        return Inertia::render('Profile/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('Profile/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'role'     => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images/userpic'), $imageName);
            $validated['image'] = '/images/userpic/' . $imageName;
        }

        $validated['password'] = bcrypt($validated['password']);

        User::create($validated);

        Inertia::flash([
            'status' => 'success',
            'message' => 'User created successfully'
        ]);

        return redirect()->route('profile.index');
    }

    public function show(String $userId)
    {
        $user = User::find($userId);

        return Inertia::render('Profile/Show', ['user' => $user]);
    }

    public function edit(String $userId)
    {
        $user = User::find($userId);

        return Inertia::render('Profile/Edit', ['user' => $user]);
    }

    public function update(Request $request, String $userId)
    {
        $user = User::findOrFail($userId);

        $rules = [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users,email,' . $userId,
            'password' => 'nullable|string|min:8',
        ];
        
        if ($request->image != $user->image) {
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg|max:2048';
        }

        $validated = $request->validate($rules);

        if ($request->filled('password')) {
            $validated['password'] = bcrypt($request->password);
        } else {
            unset($validated['password']);
        }
        
        if ($request->hasFile('image') && ($request->image != $user->image)) {
            if ($user->image && File::exists(public_path($user->image))) {
                File::delete(public_path($user->image));
            }

            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images/userpic'), $imageName);
            $validated['image'] = '/images/userpic/' . $imageName;
        }

        $user->update($validated);

        Inertia::flash([
            'status' => 'success',
            'message' => 'Profile updated successfully'
        ]);

        return redirect()->route('profile.index');
    }

    public function destroy(User $user)
    {
        if ($user->image && File::exists(public_path($user->image))) {
            File::delete(public_path($user->image));
        }

        $user->delete();

        Inertia::flash([
            'status' => 'success',
            'message' => 'User \''.$user->name.'\' deleted successfully.',
        ]);

        return redirect()->route('profile.index');
    }
}