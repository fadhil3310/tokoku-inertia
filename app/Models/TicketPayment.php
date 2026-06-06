<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Ticket;

class TicketPayment extends Model
{
    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'id');
    }
}
