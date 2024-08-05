<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class PlayerController extends Controller
{
    public function search(Request $request)
    {
        $position = $request->query('position');
        $club = $request->query('club');
        $maxCost = $request->query('max_cost');

        $query = Player::query();

        if ($position) {
            $query->where('position', $position);
        }

        if ($club) {
            $query->where('club_id', $club);
        }

        if ($maxCost) {
            $query->where('cost', '<=', $maxCost);
        }

        $query->orderBy('total_points', 'desc');

        $players = $query->get();

        return response()->json([$position, $club, $maxCost, $players]);
    }
}
