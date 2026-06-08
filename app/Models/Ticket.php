<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'event_id',
        'name',
        'description',
        'price',
        'location',
        'coordinates',
        'map',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }
}
