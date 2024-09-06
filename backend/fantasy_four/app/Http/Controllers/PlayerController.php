<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Cache;

class PlayerController extends Controller
{
    public function getById($id) {
        // Find the player by id
        $player = Player::find($id);
    
        // Check if player exists
        if ($player) {
            // Return the full player object as a JSON response
            return response()->json($player, 200);
        } else {
            // If no player found, return an error message
            return response()->json(['message' => 'Player not found'], 404);
        }
    }
    public function search(Request $request)
    {
        // Validate that all inputs are numeric except 'name'
        $validated = $request->validate([
            'position' => 'nullable|integer|min:1',
            'max_cost' => 'nullable|numeric|min:0',
            'name' => 'nullable|string'
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

            if (!empty($validated['name'])) {
                // Use 'like' for a partial match and make the search case-insensitive
                $query->where('name', 'like', '%' . $validated['name'] . '%');
            }

            $query->orderBy('total_points', 'desc');

            return $query->get();
        });

        return response()->json($players);
    }

    public function merge(Request $request, $id = null)
    {

        // Validate the input data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|integer|max:4',
            'club_id' => 'required|integer|max:19',
            'cost' => 'required|numeric|min:0',
        ]);

        // Check if a player with the given id exists
        $player = Player::find($id);

        if ($player) {
            // Update existing player
            $player->name = $validated['name'];
            $player->position = $validated['position'];
            $player->club_id = $validated['club_id'];
            $player->cost = $validated['cost'];
            $player->save();
            
            return response()->json(['message' => 'Player updated successfully', 'player' => $player], 200);
        } else {
            // Insert new player
            $newPlayer = Player::create([
                'name' => $validated['name'],
                'position' => $validated['position'],
                'photo' => '',
                'total_points' => 0,
                'club_id' => $validated['club_id'],
                'cost' => $validated['cost'],
            ]);

            return response()->json(['message' => 'Player created successfully', 'player' => $newPlayer], 201);
        }
    }

    public function destroy($id)
    {
        // Find the player by ID
        $player = Player::find($id);

        if (!$player) {
            return response()->json(['error' => 'Player not found'], 404);
        }

        // Delete the player
        $player->delete();

        return response()->json(['message' => 'Player deleted successfully']);
    }

}
