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
        Schema::create('booth_tickets', function (Blueprint $table) {
            $table->id();
            $table->uuid('booth_id');
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->timestamps();

            $table->foreign('booth_id')
            ->references('id')
            ->on('booths')
            ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booth_tickets');
    }
};
