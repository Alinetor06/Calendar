<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VisiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/visits', [VisiteController::class, 'index']);
    Route::post('/visits', [VisiteController::class, 'store']);
    Route::get('/visits/search', [VisiteController::class, 'search']);
    Route::put('/visits/{visit}', [VisiteController::class, 'update']);
    Route::delete('/visits/{visit}', [VisiteController::class, 'destroy']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

