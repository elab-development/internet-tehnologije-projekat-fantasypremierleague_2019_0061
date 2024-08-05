<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class PlayerController extends Controller
{
    public function search(Request $request)
    {
        // Retrieve query parameters
        $position = $request->query('position');
        $club = $request->query('club');
        $maxCost = $request->query('max_cost');

        // Build the query
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

        // Execute the query
        $players = $query->get();

        // Return the result as a JSON response (or you can return a view)
        return response()->json([$position, $club, $maxCost, $players]);
    }
}
