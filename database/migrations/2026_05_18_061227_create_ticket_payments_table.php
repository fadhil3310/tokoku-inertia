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
        Schema::create('ticket_payments', function (Blueprint $table) {
            $table->id();
            // antara tenant kirim uang ke website, eo cmn nerima nominal. minus: mencairkan uangnya gmn
            // atau tenant kirim uang langsung ke eo. minus: harus link akun wallet eo dengan website, web tidak menerima potongan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_payments');
    }
};
