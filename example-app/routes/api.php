<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VisiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/visits', VisiteController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
