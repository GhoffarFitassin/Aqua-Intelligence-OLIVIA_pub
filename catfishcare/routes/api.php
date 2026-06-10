<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes for API endpoints (POST, PUT, DELETE, etc.) that return JSON
| responses. These are separate from web routes which handle Inertia page
| navigation. API routes are prefixed with /api and use Sanctum token auth.
|
*/

// Public API routes (no authentication required)
Route::post('/login', [AuthController::class, 'login'])->name('api.login');

// Protected API routes (require valid Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
    Route::get('/profile', [ProfileController::class, 'show'])->name('api.profile.show');
    Route::put('/profile', [ProfileController::class, 'updateApi'])->name('api.profile.update');
});
