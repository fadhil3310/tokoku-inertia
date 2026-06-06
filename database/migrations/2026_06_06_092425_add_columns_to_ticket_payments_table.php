<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ticket_payments', function (Blueprint $table) {
            $table->foreignId('ticket_id')->constrained('tickets')->after('id')->cascadeOnDelete();
            $table->uuid('booth_id')->after('ticket_id');
            $table->foreign('booth_id')
            ->references('id')
            ->on('booths')
            ->cascadeOnDelete();

            $table->integer('quantity')->default(1)->after('booth_id');
            $table->decimal('total_price', 12, 2)->nullable()->after('quantity');
            
            $table->string('midtrans_transaction_id')->nullable()->after('total_price'); 
            $table->string('payment_type')->nullable()->after('midtrans_transaction_id');
            $table->enum('status', ['pending', 'paid', 'expired', 'canceled'])->default('pending')->after('payment_type');
        });
    }

    public function down(): void
    {
        Schema::table('ticket_payments', function (Blueprint $table) {
            $table->dropForeign(['ticket_id']);
            $table->dropForeign(['booth_id']);
            
            $table->dropColumn([
                'ticket_id',
                'booth_id',
                'quantity',
                'total_price',
                'midtrans_transaction_id',
                'payment_type',
            ]);
        });
    }
};