<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Drop the columns we want to replace or reconfigure
        Schema::table('ticket_payments', function (Blueprint $table) {
            $table->dropColumn([
                'quantity', 
                'total_price', 
                'midtrans_transaction_id', 
                'payment_type', 
                'status'
            ]);
        });

        // 2. Add the new columns matching the product_payments structure
        Schema::table('ticket_payments', function (Blueprint $table) {
            $table->string('id')->change(); 

            $table->enum('payment_method', ['midtrans', 'cash'])->after('booth_id');
            $table->integer('amount')->after('payment_method')->comment('Acts as quantity');
            $table->integer('price')->after('amount');
            $table->integer('grand_total')->after('price');
            $table->string('description')->nullable()->after('ticket_id');
            $table->enum('status', ['pending', 'completed', 'canceled'])->default('pending')->after('description');
            $table->string('payment_url')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        // Rollback to original ticket_payments structure
        Schema::table('ticket_payments', function (Blueprint $table) {
            $table->dropColumn(['payment_method', 'amount', 'price', 'grand_total', 'description', 'status', 'payment_url']);
            
            $table->integer('quantity')->default(1);
            $table->decimal('total_price', 12, 2)->nullable();
            $table->string('midtrans_transaction_id')->nullable();
            $table->string('payment_type')->nullable();
            $table->enum('status', ['pending', 'paid', 'expired', 'canceled'])->default('pending');
        });
    }
};