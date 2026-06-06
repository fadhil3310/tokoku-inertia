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
        Schema::table('product_payments', function (Blueprint $table) {
            $table->enum("payment_method", ["midtrans", "cash"]);
            $table->uuid("booth_id")->constrained()->onDelete('cascade');
            $table->integer("amount");
            $table->integer("price");
            $table->integer("grand_total");

            // Store the product information so we still have it in case it will be deleted in the future.
            $table->string('product_id');
            $table->string('sku');
            $table->string('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_payments', function (Blueprint $table) {
            //
        });
    }
};
