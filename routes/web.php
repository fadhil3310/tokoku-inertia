<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Home'));
Route::get('/dashboard', fn() => Inertia::render('Dashboard'));
Route::get('/transactions', fn() => Inertia::render('Transactions'));
Route::get('/payment', fn() => Inertia::render('Payment'));
Route::get('/booth', fn() => Inertia::render('Booth'));
Route::get('/transactions/form', fn() => Inertia::render('TransactionsForm'));
Route::get('/login', fn() => Inertia::render('Login'));
Route::get('/signup', fn() => Inertia::render('Signup'));
Route::get('/profile', fn() => Inertia::render('Profile/Show'));
Route::get('/notifications', fn() => Inertia::render('Notifications/Index'));

Route::resource('products', ProductController::class);