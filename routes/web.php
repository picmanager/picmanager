<?php

use App\Http\Controllers\DiskSpaceController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use App\Models\Media;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/photos', [MediaController::class, 'index'])->name('media.index');
    Route::post('/upload', [MediaController::class, 'store'])->name('media.store');
    Route::get('/archive', function () {
        return Inertia::render('Authenticated/Archive');
    })->name('media.archive');
    Route::get('/albums', function () {
        return Inertia::render('Authenticated/Albums', [
            'photos' => Media::all()
        ]);
    })->name('media.albums');
    Route::get('/explore', function () {
        return Inertia::render('Authenticated/Explore');
    })->name('media.explore');
    Route::get('/favorites', function () {
        return Inertia::render('Authenticated/Favorites');
    })->name('media.favorites');
    Route::get('/map', function () {
        return Inertia::render('Authenticated/Map');
    })->name('media.map');
    Route::get('/share', function () {
        return Inertia::render('Authenticated/Share');
    })->name('media.share');
    Route::get('/trash', function () {
        return Inertia::render('Authenticated/Trash');
    })->name('media.trash');
    Route::get('/utilities', function () {
        return Inertia::render('Authenticated/Utilities');
    })->name('media.utilities');
});

require __DIR__.'/auth.php';
