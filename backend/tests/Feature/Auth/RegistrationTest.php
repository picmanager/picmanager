<?php

use function PHPUnit\Framework\assertNotNull;

test('new users can register', function () {
    $response = $this->post('/api/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'storage_label' => 'test',
        'status' => 'active',
    ]);

    $this->assertAuthenticated();

    $user = Auth::user();
    $token = $user->tokens()->where('name', 'test@example.com')->pluck('token')->firstOrFail();

    assertNotNull($token);

    $response->assertNoContent();

});
