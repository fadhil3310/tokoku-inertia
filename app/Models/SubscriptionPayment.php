<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionPayment extends Model
{
    use HasFactory;

    // Tell Eloquent that the primary key is NOT an auto-incrementing integer
    public $incrementing = false;

    // Define the primary key data type type as a string
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'subscription_id',
        'user_id',
        'plan_id',
        'payment_method',
        'amount',
        'price',
        'grand_total',
        'status',
        'payment_url',
        'description',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}