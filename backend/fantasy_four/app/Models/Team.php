<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Team extends Model
{
    use HasFactory;

    protected $primaryKey = 'user_id';

    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'name'
    ];

    public $timestamps = false;

    public function user(){
        return $this->BelongsTo(User::class);
    }

    public function acquisitions(){
        return $this->hasMany(Acquisition::class);
    }
}
