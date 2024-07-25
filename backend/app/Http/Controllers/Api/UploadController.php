<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadMediaRequest;
use App\Models\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;


class UploadController extends Controller
{
    public function upload(UploadMediaRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $file = $validated["file"];
        $name = $file->hashName();

        $user = auth()->user();

        $upload = Storage::put("media/" . $user->email . '/', $file);

        Media::query()->create(
            attributes: [
                'name' => "{$name}",
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getClientMimeType(),
                'path' => "media/{$name}",
                'disk' => 'local',
                'collection' => $request->get('collection'),
                'size' => $file->getSize(),
            ],
        );

        return response()->json(['message' => 'File uploaded successfully.']);
    }
}
