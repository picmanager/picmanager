<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('installation screen can be rendered when no users are present in the DB', function () {
    $this->get('/')
        ->assertInertia(fn(Assert $page) => $page
            ->component('Guest/Install')
        );
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/');

    $response->assertRedirect(route('media.index', absolute: false));
});

test('installation process', function () {
    $response = $this->post('/install', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});
