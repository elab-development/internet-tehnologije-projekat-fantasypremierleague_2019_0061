<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

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

    public function merge(Request $request)
{
    // Validate the input data, including the optional id field
    $validated = $request->validate([
        'id' => 'nullable|integer|exists:players,id', // Nullable if creating a new player
        'name' => 'required|string|max:255',
        'position' => 'required|integer|max:4',
        'club_id' => 'required|integer|max:19',
        'cost' => 'required|numeric|min:0',
    ]);

    // Check if a player with the given id exists
    $player = Player::find($validated['id']);

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
            'photo' => '', // Default value for photo
            'total_points' => 0, // Default value for total points
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

    public function getBestPlayers(){
        // Fetch data from the FPL API
        $response = Http::get('https://fantasy.premierleague.com/api/bootstrap-static/');
        
        // Handle failed response
        if($response->failed()){
            return response()->json(['message' => 'Fetching the data was unsuccessful']);
        }
    
        // Get the JSON response and extract players
        $data = $response->json();
        $players = $data['elements'];
    
        $goalkeepers = [];
        $defenders = [];
        $midfielders = [];
        $forwards = [];

        foreach ($players as $player) {
            $playerData = [
                'id' => $player['id'],
                'name' => $player['web_name'],
                'total_points' => $player['total_points'],
                'photo' => 'https://resources.premierleague.com/premierleague/photos/players/110x140/p' . str_replace('jpg', 'png', $player['photo'])
            ];
    
            if ($player['element_type'] == 1) {
                $goalkeepers[] = $playerData;
            } elseif ($player['element_type'] == 2) {
                $defenders[] = $playerData;
            } elseif ($player['element_type'] == 3) {
                $midfielders[] = $playerData;
            } elseif ($player['element_type'] == 4) {
                $forwards[] = $playerData;
            }
        }

        $bestPlayers = [
            'goalkeeper' => null,
            'defender' => null,
            'midfielder' => null,
            'forward' => null,
        ];

        foreach($goalkeepers as $goalkeeper){
            if($bestPlayers['goalkeeper'] == null || $goalkeeper['total_points'] > $bestPlayers['goalkeeper']['total_points']){
                $bestPlayers['goalkeeper'] = $goalkeeper;
            }
        }
        foreach($defenders as $defender){
            if($bestPlayers['defender'] == null || $defender['total_points'] > $bestPlayers['defender']['total_points']){
                $bestPlayers['defender'] = $defender;
            }
        }
        foreach($midfielders as $midfielder){
            if($bestPlayers['midfielder'] == null || $midfielder['total_points'] > $bestPlayers['midfielder']['total_points']){
                $bestPlayers['midfielder'] = $midfielder;
            }
        }
        foreach($forwards as $forward){
            if($bestPlayers['forward'] == null || $forward['total_points'] > $bestPlayers['forward']['total_points']){
                $bestPlayers['forward'] = $forward;
            }
        }

        return response()->json($bestPlayers);
       
    }

}
