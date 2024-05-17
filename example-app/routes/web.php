<?php

use App\Http\Controllers\VisiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::resource('visite', VisiteController::class);
});
