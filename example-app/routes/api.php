<?php

use App\Http\Controllers\Api\LoginRegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/register', [LoginRegisterController::class, 'createUser']);
Route::post('/auth/login', [LoginRegisterController::class, 'loginUser']);
