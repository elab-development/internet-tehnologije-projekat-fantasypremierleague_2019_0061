<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class PlayerController extends Controller
{
    public function search(Request $request)
{
    // Validate that all inputs are numeric
    $validated = $request->validate([
        'position' => 'nullable|integer|min:1',
        'max_cost' => 'nullable|numeric|min:0'
    ]);

    $query = Player::query();

    if (!empty($validated['position'])) {
        $query->where('position', $validated['position']);
    }

    if (isset($validated['max_cost'])) {
        $query->where('cost', '<=', $validated['max_cost']);
    }

    $query->orderBy('total_points', 'desc');

    $players = $query->get();

    return response()->json($players);
}
}
