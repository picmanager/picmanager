<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;

test('user can upload file', function () {
    $user = User::factory()->create();

    $file = UploadedFile::fake()->image('avatar.jpg');

    $response = $this
        ->actingAs($user)
        ->post('/upload', [
            'file' => $file,
        ]);

    Storage::disk('picmanager')->assertExists($file->hashName());

    $response->assertStatus(200);
});
