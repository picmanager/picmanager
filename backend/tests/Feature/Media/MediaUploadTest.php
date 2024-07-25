<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Laravel\Sanctum\Sanctum;

test('user can upload file if logged in', function () {
    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $file = UploadedFile::fake()->image('test2.png');
    $response = $this->post('/api/upload', [
        'file' => $file,
    ]);

    Storage::disk('local')->assertExists("/media/" . $user->email . '/' . $file->hashName());

    $response->assertStatus(200);
});

test('user cannot upload file if not logged in', function () {
    $file = UploadedFile::fake()->image('test2.png');
    $response = $this->post('/api/upload', [
        'file' => $file,
    ]);

    $response->assertRedirect('/api/login');
});

test('user can only upload allowed file types', function () {
    Sanctum::actingAs(
        User::factory()->create(),
    );

    $file = UploadedFile::fake()->image('test2.tiff');
    $response = $this->post('/api/upload', [
        'file' => $file,
    ]);

    $response->assertInvalid(['file' => ['extensions', 'type']]);
});
