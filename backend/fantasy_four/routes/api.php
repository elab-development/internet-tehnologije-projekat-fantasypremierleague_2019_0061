<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\AcquisitionController;


use Illuminate\Support\Facades\Auth;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('teams', TeamController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('acquisitions', AcquisitionController::class);
});

Route::get('/test-auth', function () {
    return response()->json(['user_id' => Auth::id()]);
});

Route::get('/players/search', [PlayerController::class, 'search']);
