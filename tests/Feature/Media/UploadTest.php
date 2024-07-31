<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;

test('user can upload file', function () {
    $user = User::factory()->create();

    $file = UploadedFile::fake()->image('avatar.jpg');
    $ctime['ctime'] = time() * 1000;
    $images[] = $file;
    $ctimes[] = $ctime;
    $response = $this
        ->actingAs($user)
        ->post('/upload', [
            'images' => $images,
            'ctimes' => $ctimes,
        ]);

    Storage::disk('picmanager')->assertExists($file->hashName());

    $response->assertRedirectToRoute('home');

    $response->assertStatus(302);
});
