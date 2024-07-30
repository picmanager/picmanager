<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class MediaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'images.*' => [
                'required',
                'extensions:jpg,jpeg,png,bmp,gif,svg,webp',
                'mimes:jpg,jpeg,png,bmp,gif,svg,webp',
                File::image()
                    ->max(50 * 1024),
            ],
        ];
    }
}
