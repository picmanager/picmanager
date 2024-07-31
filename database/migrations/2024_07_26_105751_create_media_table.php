<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained();

            $table->string('name');
            $table->string('file_name');
            $table->dateTime('original_date')->nullable();
            $table->unsignedBigInteger('size');
            $table->string('make_model')->nullable();
            $table->string('aperture')->nullable();
            $table->string('exposure_time')->nullable();
            $table->string('focal_length')->nullable();
            $table->string('iso')->nullable();
            $table->string('width')->nullable();
            $table->string('height')->nullable();
            $table->string('megapixel')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
