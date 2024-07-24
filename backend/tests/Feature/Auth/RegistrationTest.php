<?php


test('new users can register', function () {
    $response = $this->post('/api/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);
    $this->assertAuthenticated();
    $response->assertNoContent();

});

test('user can upload file', function () {
    $file = \Illuminate\Http\UploadedFile::fake()->image('test.png');
   $response = $this->post('/api/upload', [
       'file' => $file,
   ]);
//   storage_path('/app/avatars')
   Storage::disk('local')->assertExists("/avatars/".$file->hashName());

   $response->assertStatus(200);
});
