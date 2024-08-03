<?php

namespace App\Http\Controllers;

use App\Http\Requests\MediaRequest;
use App\Models\Media;
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
        $cTime = $request['ctime'];
        $validated = $request->validated();
        $image = $validated['image'];
        $id = auth()->user()->id;

        $this->storeData($cTime, $image, $id);

        return to_route('media.index');
//        return back()->with('status', 'Image Uploaded Successfully');
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
                $data[$key]['photos']['name'][] = $result['name'];
                if ($result['width'] > $result['height']) {
                    $data[$key]['photos']['orientation'][] = 'landscape';
                } else {
                    $data[$key]['photos']['orientation'][] = 'portrait';
                }
            }
        }

        return $data;
    }

    private function storeData($cTime, $image, $id)
    {
        $name = $image->hashName();
        Storage::put("/", $image);
//        dd(exif_read_data($image));

        if (@exif_read_data($image)['DateTime'] === null) {
            $original_date = gmdate("Y-m-d H:i:s", ($cTime / 1000));
        } else {
            $original_date = exif_read_data($image)['DateTime'];
        }

        if (@exif_read_data($image)['Make'] === null || @exif_read_data($image)['Model'] === null) {
            $make_model = null;
        } else {
            $make_model = exif_read_data($image)['Make'] . ' ' . exif_read_data($image)['Model'];
        }

        if (@exif_read_data($image)['COMPUTED']['ApertureFNumber'] === null) {
            $aperture = null;
        } else {
            $aperture = exif_read_data($image)['COMPUTED']['ApertureFNumber'];
        }

        if (@exif_read_data($image)['ExposureTime'] === null) {
            $exposure = null;
        } else {
            $exposure = exif_read_data($image)['ExposureTime'];
        }

        if (@exif_read_data($image)['FocalLength'] === null) {
            $focalLength = null;
        } else {
            $focalOriginal = exif_read_data($image)['FocalLength'];
            $focal = explode('/', $focalOriginal);
            $focalLength = ($focal[0] / $focal[1]) . 'mm';
        }

        if (@exif_read_data($image)['ISOSpeedRatings'] === null) {
            $iso = null;
        } else {
            $iso = exif_read_data($image)['ISOSpeedRatings'];
        }

        if (@exif_read_data($image)['ImageWidth'] === null) {
            $width = getimagesize($image)[0];
        } else {
            $width = exif_read_data($image)['ImageWidth'];
        }

        if (@exif_read_data($image)['ImageLength'] === null) {
            $height = getimagesize($image)[1];
        } else {
            $height = exif_read_data($image)['ImageLength'];
        }

        $megapixel = ($width * $height) / 1000000;

        Media::create([
            'user_id' => $id,
            'name' => $name,
            'file_name' => $image->getClientOriginalName(),
            'size' => $image->getSize(),
            'original_date' => $original_date,
            'aperture' => $aperture,
            'exposure_time' => $exposure,
            'focal_length' => $focalLength,
            'iso' => $iso,
            'width' => $width,
            'height' => $height,
            'megapixel' => $megapixel,
            'make_model' => $make_model,
        ]);
    }
}
