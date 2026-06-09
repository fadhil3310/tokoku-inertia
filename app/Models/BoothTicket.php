<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoothTicket extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass fillable.
     */
    protected $fillable = [
        'booth_id',
        'event_id',
        'status',
    ];

    /**
     * Get the booth registered for the event.
     */
    public function booth()
    {
        return $this->belongsTo(Booth::class);
    }

    /**
     * Get the event the booth registered for.
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}