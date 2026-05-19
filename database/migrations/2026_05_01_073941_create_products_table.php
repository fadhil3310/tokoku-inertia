<?php

use App\ProductCategory;
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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('booth_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->double('price');
            $table->enum('category', ['sticker', 'poster', 'print', 'accessory', 'food', 'beverage', 'clothing', 'undefined'])->default('undefined');
            $table->string('sku')->unique();
            $table->integer('stock');
            $table->string('image');
            $table->enum('status', ['draft', 'pending', 'published', 'archived', 'inactive'])->default('draft');
            $table->enum('visibility', ['private', 'public'])->default('private');
            $table->timestamps();
            
            $table->foreign('booth_id')->references('id')->on('booths')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
