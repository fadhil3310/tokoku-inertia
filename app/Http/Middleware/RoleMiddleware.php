<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles)
    {
        if (!Auth::check()) {
            $eventId = $request->route('id');

            if ($eventId) {
                return redirect('/login?redirect=' . $eventId);
            }

            return redirect('/login');
        }

        if (!in_array(Auth::user()->role, $roles)) {
            // masih sementara
            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'Role Denied',
                    'message' => "You must be a " . implode(' or ', $roles) . " to perform this action."
                ], 403);
            }

            abort(403, "Role Denied. You must be a " . implode(' or ', $roles) . " to access this page.");
        }

        return $next($request);
    }
}