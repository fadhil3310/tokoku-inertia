<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration_days',
        'midtrans_plan_id',
    ];

    protected $casts = [
        'description' => 'array',
        'price' => 'decimal:2',
    ];
}