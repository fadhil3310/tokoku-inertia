<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketPayment extends Model
{
    use HasFactory;

    // Disable auto-incrementing because IDs are manually generated strings
    public $incrementing = false;

    // Define the primary key type as a string
    protected $keyType = 'string';

    /**
     * The attributes that are mass fillable.
     */
    protected $fillable = [
        'id',
        'ticket_id',
        'booth_id',
        'payment_method',
        'amount',
        'price',
        'grand_total',
        'description',
        'status',
        'payment_url',
    ];

    /**
     * Get the ticket associated with the payment.
     */
    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'id');
    }

    /**
     * Get the booth that made the payment.
     */
    public function booth()
    {
        return $this->belongsTo(Booth::class, 'booth_id', 'id');
    }
}