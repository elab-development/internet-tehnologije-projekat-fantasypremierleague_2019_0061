<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Performance extends Model
{
    use HasFactory;

    public function player(){
        return $this->belongsTo(Player::class);
    }

    public function gameweek(){
        return $this->belongsTo(Gameweek::class);
    }
}
