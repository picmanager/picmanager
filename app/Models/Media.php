<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'file_name',
        'size',
        'original_date',
        'make_model',
        'aperture',
        'exposure_time',
        'focal_length',
        'iso',
        'width',
        'height',
        'megapixel',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
