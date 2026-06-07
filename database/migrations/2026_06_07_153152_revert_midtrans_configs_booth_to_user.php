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
        Schema::table('midtrans_configs', function (Blueprint $table) {
            // $table->dropForeign(['booth_id']);
            $table->dropColumn('booth_id');

            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('midtrans_configs', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            $table->uuid('booth_id');

            $table->foreign('booth_id')
                ->references('id')
                ->on('booths')
                ->onDelete('cascade');
        });
    }
};
