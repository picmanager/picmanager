<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Route::apiResource('admin/users', AdminController::class);

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('web')
    ->name('login');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('web')
    ->name('logout');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::controller(AdminController::class)->group(function () {
    Route::get('/admin/users', 'index');
    Route::post('/admin/users', 'store');
    Route::get('/admin/users/{id}', 'show');
    Route::patch('/admin/users/{id}', 'update');
    Route::delete('/admin/users/{id}', 'destroy');
    Route::post('/admin/users/{id}/restore', 'restore');
});
