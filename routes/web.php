<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\MidtransConfigController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BoothController;
use App\Http\Controllers\ProductPaymentController;
use App\Http\Controllers\ProductTransactionController;

Route::get('/login', fn() => Inertia::render('Auth/Login'))->name('login');
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

Route::get('/', [HomeController::class, 'index']);

// Public Event Route
Route::get('/detail/event/{id}', [EventController::class, 'detail']);

// Auth & Tenant Only Routes
Route::middleware(['role:tenant'])->group(function () {
    Route::get('/join/event/{id}', [EventController::class, 'show']);
    Route::post('/join/event/{id}', [EventController::class, 'join']);
});

// General Authenticated Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/transactions', fn() => Inertia::render('Transactions'));
    Route::get('/payment', fn() => Inertia::render('Payment'));
    Route::get('/transactions/form', fn() => Inertia::render('TransactionsForm'));
    Route::get('/notifications', fn() => Inertia::render('Notifications/Index'));
    Route::get('/subscription', fn() => Inertia::render('Subscription'));
    Route::resource('booth', BoothController::class);
    Route::resource('transactions', ProductTransactionController::class);
    Route::resource('payment-link', MidtransConfigController::class);
    
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('profile', UserController::class)
        ->only(['index', 'create', 'store', 'edit', 'destroy']);
});

Route::middleware(['auth', 'role:admin,tenant,event organizer'])->group(function () {
    Route::resource('profile', UserController::class)
        ->only(['show', 'update']);
});

Route::middleware(['auth', 'role:admin,tenant'])->group(function () {
    Route::resource('products', ProductController::class);
});

Route::middleware(['auth', 'role:admin,event organizer'])->group(function () {
    Route::prefix('events')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('events.index');
        Route::get('/create', fn() => Inertia::render('Event/Form'))->name('events.create');
        Route::get('/edit/{id}', [EventController::class, 'edit'])->name('events.edit');
        
        Route::post('/store', [EventController::class, 'store'])->name('events.store');
        Route::put('/edit/{id}', [EventController::class, 'update'])->name('events.update');
        Route::delete('/delete/{id}', [EventController::class, 'destroy'])->name('events.delete');
    });
});

// Catalog
Route::get('/catalog/{boothId}/check-payment-status/{orderId}', [CatalogController::class, 'checkPaymentStatus'])->name('catalog.checkPaymentStatus');
Route::get('/catalog/{boothId}', [CatalogController::class, 'index'])->name('catalog');
Route::get('/catalog/{boothId}/{id}', [CatalogController::class, 'show'])->name('catalog.show');
Route::get('/catalog/{boothId}/image/{id}', [CatalogController::class, 'showImage'])->name('catalog.showImage');

// Payment
Route::post('/payment/product/checkout', [ProductPaymentController::class, 'checkout'])->name("payment.product.checkout");