<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booth extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name', 
        'description', 
        'image',
        'owner_id',
        'catalog_html',
        'catalog_css',
    ];
    
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
