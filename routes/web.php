<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CatalogueController;

Route::get('/login', fn() => Inertia::render('Auth/Login'));
Route::post('/login', [AuthController::class, 'login']);
Route::get('/signup', fn() => Inertia::render('Auth/Signup'));
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/', [HomeController::class, 'index']);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'));
    Route::get('/transactions', fn() => Inertia::render('Transactions'));
    Route::get('/payment', fn() => Inertia::render('Payment'));
    Route::get('/booth', fn() => Inertia::render('Booth'));
    Route::get('/transactions/form', fn() => Inertia::render('TransactionsForm'));
    Route::get('/profile', fn() => Inertia::render('Profile/Show'));
    Route::get('/notifications', fn() => Inertia::render('Notifications/Index'));
    Route::resource('products', ProductController::class);
    Route::get('/subscription', fn() => Inertia::render('Subscription'));
    Route::resource('catalogue', CatalogueController::class);
});
