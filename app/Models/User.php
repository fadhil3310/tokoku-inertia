<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;

use App\Models\Event;
use App\Models\Booth;

#[Fillable(['name', 'email', 'password', 'image', 'role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function events()
    {
        return $this->hasMany(Event::class, 'owner_id', 'id');
    }

    public function booth()
    {
        return $this->hasOne(Booth::class, 'owner_id', 'id');
    }
    
    public function midtransConfig(): HasOne
    {
        return $this->hasOne(Booth::class, "owner_id");
    }

    public function productPayments(): HasMany
    {
        return $this->hasMany(ProductPayment::class);
    }
}
