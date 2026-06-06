<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('terms')->nullable();
            $table->dateTime('date_start');
            $table->dateTime('date_end');
            $table->string('poster')->nullable();
            $table->string('location')->nullable();
            $table->string('coordinates')->nullable();
            $table->string('map')->nullable();         
            $table->string('contact')->nullable();
            $table->integer('max_participants')->nullable();
            $table->enum('visibility', ['public', 'unlisted', 'private'])->default('unlisted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
