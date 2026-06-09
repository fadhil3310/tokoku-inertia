<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subscription_payments', function (Blueprint $table) {            
            $table->foreignId('subscription_id')->constrained('subscriptions')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained('plans')->cascadeOnDelete();
            
            $table->enum('payment_method', ['midtrans', 'cash']);
            $table->integer('amount')->default(1)->comment('Acts as unit quantity');
            $table->integer('price');
            $table->integer('grand_total');
            $table->string('description')->nullable();
            $table->enum('status', ['pending', 'completed', 'canceled'])->default('pending');
            $table->string('payment_url', 500)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscription_payments');
    }
};