<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Cache;

class PlayerController extends Controller
{
    public function search(Request $request)
{
    // Validate that all inputs are numeric
    $validated = $request->validate([
        'position' => 'nullable|integer|min:1',
        'max_cost' => 'nullable|numeric|min:0'
    ]);

    // Generate a unique cache key based on the search criteria
    $cacheKey = 'players_search_' . md5(json_encode($validated));

    // Check if the results are already cached
    $players = Cache::remember($cacheKey, 60, function () use ($validated) {
        $query = Player::query();

        if (!empty($validated['position'])) {
            $query->where('position', $validated['position']);
        }

        if (isset($validated['max_cost'])) {
            $query->where('cost', '<=', $validated['max_cost']);
        }

        $query->orderBy('total_points', 'desc');

        return $query->get();
    });

    return response()->json($players);
}
}
