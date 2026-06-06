<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'owner_id',
        'name',
        'description',
        'terms',
        'date_start',
        'date_end',
        'poster',
        'location',
        'coordinates',
        'map',
        'contact',
        'max_participants',
        'visibility',
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'date_start' => 'datetime',
        'date_end'   => 'datetime',
        'terms'      => 'array',
    ];

    /**
     * Get the full URL for the event poster.
     */
    public function getPoster()
    {
        if (empty($this->poster)) {
            return null; // Or return a default placeholder image URL here
        }

        if (str_starts_with($this->poster, 'http')) {
            return $this->poster;
        }

        return asset('storage/' . $this->poster);
    }

    /**
     * Get the full URL for the event map.
     */
    public function getMap()
    {
        if (empty($this->map)) {
            return null;
        }

        if (str_starts_with($this->map, 'http')) {
            return $this->map;
        }

        return asset('storage/' . $this->map);
    }

    /**
     * Get the organizer (user) that owns the event.
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Get the tickets associated with this event.
     */
    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
    
    /**
     * Get the booths associated with this event.
     */
    public function booths(): HasMany
    {
        return $this->hasMany(Booth::class);
    }
}