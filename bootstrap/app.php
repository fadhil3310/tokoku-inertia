<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class, ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Illuminate\Database\QueryException $e, $request) {
            if ($e->getCode() === 2002 || $e->getCode() === 'HY000') {
                if ($request->header('X-inertia')) {
                    return response()->json(['error' => 'Service unavailable'], 503);
                }
                return inertia('Errors/DatabaseError')
                    ->toResponse($request)
                    ->setStatusCode(503);
            }
        });
    })->create();
