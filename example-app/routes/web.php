<?php

use App\Http\Controllers\visiteController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::resource('visite', visiteController::class);