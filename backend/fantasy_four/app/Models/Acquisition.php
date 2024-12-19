<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acquisition extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function team(){
        return $this->belongsTo(Team::class);
    }

    public function player(){
        return $this->belongsTo(Player::class);
    }
}
