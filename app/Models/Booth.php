<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
        'email',
        'phone',
        'instagram',
        'twitter',
    ];
    
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function midtransConfig(): HasOne
    {
        return $this->hasOne(MidtransConfig::class);
    }
}
