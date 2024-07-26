<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $userCount = User::all()->count();

        if ($userCount === 0) {
            return Inertia::render('Guest/Install');
        }

        return Redirect::route('media.index');
    }
}
