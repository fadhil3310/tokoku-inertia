<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CatalogController;

Route::get('/login', fn() => Inertia::render('Auth/Login'));
Route::post('/login', [AuthController::class, 'login']);
Route::get('/signup', fn() => Inertia::render('Auth/Signup'));
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/', fn() => Inertia::render('Home'));
Route::get('/about-us', fn() => Inertia::render('AboutUs'));
Route::get('/features', fn() => Inertia::render('Features'));
Route::get('/pricing', fn() => Inertia::render('Pricing'));
Route::get('/contact', fn() => Inertia::render('Contact'));
Route::get('/support', fn() => Inertia::render('Support'));

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

    // Catalog
    Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog');
    Route::get('/catalog/{id}', [CatalogController::class, 'show'])->name('catalog.show');
    Route::get('/catalog/image/{id}', [CatalogController::class, 'showImage'])->name('catalog.showImage');
});
