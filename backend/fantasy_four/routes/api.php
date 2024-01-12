<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\PlayerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/coaches', [CoachController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth')->resource('teams', TeamController::class);

Route::get('/players', [PlayerController::class, 'index']);

Route::get('/players/{search_parameter}', [PlayerController::class, 'show']);

Route::get('/coaches/{search_parameter}', [CoachController::class, 'show']);