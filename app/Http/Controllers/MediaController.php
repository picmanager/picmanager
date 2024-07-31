<?php

namespace App\Http\Controllers;

use App\Http\Requests\MediaRequest;
use App\Models\Media;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    /**
     * Display the upload form.
     */
    public function index()
    {

        return Inertia::render('Authenticated/Photos', [
            'data' => $this->getData(),
        ]);
    }

    public function store(MediaRequest $request)
    {
        $cTimes = $request['ctimes'];

        $validated = $request->validated();
        $images = $validated['images'];
        $user = auth()->user();

        foreach ($images as $key => $image) {
            $name = $image->hashName();
            $exifDate = @exif_read_data($image)['DateTimeOriginal'];
            $upload = Storage::put("/", $image);

            if ($exifDate === null) {
                $original_date = gmdate("Y-m-d H:i:s", ($cTimes[$key]['ctime'] / 1000));
            } else {
                $original_date = $exifDate;
            }

            Media::create([
                'user_id' => $user->id,
                'name' => $name,
                'file_name' => $image->getClientOriginalName(),
                'size' => $image->getSize(),
                'original_date' => $original_date,
            ]);
        }

        return back()->with('status', 'Image Uploaded Successfully');
    }

    public function show(Media $media)
    {
        return $media;
    }

    public function update(MediaRequest $request, Media $media)
    {
        $media->update($request->validated());

        return $media;
    }

    public function destroy(Media $media)
    {
        $media->delete();

        return response()->json();
    }

    private function getData()
    {
        $data = [];
        $photoDates = [];

        $photos = Media::all()
            ->where('user_id', auth()->user()->id)
            ->sortByDesc('original_date');

        foreach ($photos as $photo) {
            $photoDates[] .= date("Y-m-d", strtotime($photo['original_date']));
        }

        $dates = array_values(array_unique($photoDates));
        foreach ($dates as $key => $date) {
            $dates[$key] = date("D, j M Y", strtotime($date));
        }

        foreach ($dates as $key => $date) {
            $data[$key]['date'] = $date;
            $data[$key]['photos'] = [];
        }
        foreach ($dates as $key => $date) {
            $time = date("Y-m-d", strtotime($date));
            $photo = Media::query()
                ->where('user_id', auth()->user()->id)
                ->where('original_date', 'like', '%' . $time . '%')->get();
            foreach ($photo as $result) {
                $data[$key]['photos'][] = $result['name'];
            }
        }

        return $data;
    }
}
