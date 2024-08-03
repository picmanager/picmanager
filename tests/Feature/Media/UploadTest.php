<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;

test('user can upload file', function () {
    $user = User::factory()->create();

    $file = UploadedFile::fake()->image('avatar.jpg');
    $ctime = time() * 1000;
    $response = $this
        ->actingAs($user)
        ->post('/upload', [
            'image' => $file,
            'ctime' => $ctime,
        ]);

    Storage::disk('picmanager')->assertExists($file->hashName());

    $response->assertRedirectToRoute('media.index');

    $response->assertStatus(302);
});
