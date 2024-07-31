<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

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

    /**
     * Handle initial installation request.
     */
    public function install(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'storage_label' => 'admin',
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('media.index', absolute: false));
    }
}
