<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Acquisition;
use App\Models\Team;
use App\Models\Player;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AcquisitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $playerIds = $request->all();
        $userId = Auth::id(); 
        $team = Team::find($userId); 

        if (!$team) {
            return response()->json(['error' => 'Team not found for the current user.'], 404);
        }

        if (count($playerIds) !== 4) {
            return response()->json(['error' => 'Exactly four player IDs are required, ' . count($playerIds) . ' given.'], 400);
        }

        $totalCost = 0;
        $positions = [];

        foreach ($playerIds as $playerId) {
            $player = Player::find($playerId);

            if (!$player) {
                return response()->json(['error' => 'Player not found.'], 404);
            }

            if (in_array($player->position, $positions)) {
                return response()->json(['error' => 'Each player must have a unique position.'], 400);
            }

            $positions[] = $player->position;
            $totalCost += $player->cost;
        }

        if ($totalCost > 1000) {
            return response()->json(['error' => 'Total cost exceeds the budget limit of 1000.'], 400);
        }

        foreach ($playerIds as $playerId) {
            $newAcquisition = new Acquisition();
            $newAcquisition->player_id = $playerId;
            $newAcquisition->team_user_id = $userId; // Use the user ID as the team ID
            $newAcquisition->save();
        }

        $team->budget -= $totalCost;
        $team->is_valid = true;
        $team->save();

        return response()->json(['success' => 'Acquisitions stored successfully.', 'team' => $team], 201);
    }

    public function getPlayersByTeamAcquisitions(Request $request)
    {
        $userId = Auth::id();

        $team = Team::find($userId);

        if (!$team) {
            return response()->json(['error' => 'Team not found for the current user.'], 404);
        }

        $acquisitions = $team->acquisitions()->with('player')->get();

        $players = $acquisitions->pluck('player');

        return response()->json(['players' => $players], 200);
    }

    public function transferPlayers(Request $request)
    {
        $userId = Auth::id(); 
        $team = Team::find($userId);

        if (!$team) {
            return response()->json(['error' => 'Team not found for the current user.'], 404);
        }

        $playerPairs = $request->input('player_pairs');

        $totalCostDifference = 0;

        foreach ($playerPairs as $pair) {
            $oldPlayerId = $pair['old_player_id'];
            $newPlayerId = $pair['new_player_id'];

            $oldPlayer = Player::find($oldPlayerId);
            $newPlayer = Player::find($newPlayerId);

            if (!$oldPlayer || !$newPlayer) {
                return response()->json(['error' => 'One or both players not found.'], 404);
            }

            if ($oldPlayer->position !== $newPlayer->position) {
                return response()->json(['error' => 'Players must be of the same position for transfer.'], 400);
            }

            $costDifference = $newPlayer->cost - $oldPlayer->cost;
            $totalCostDifference += $costDifference;
        }

        $currentSquadValue = $team->acquisitions()->with('player')->get()->sum(function ($acquisition) {
            return $acquisition->player->cost;
        });

        $newSquadValue = $currentSquadValue + $totalCostDifference;

        if ($newSquadValue > 300) {
            return response()->json(['error' => 'Total squad value exceeds the limit of 300.'], 400);
        }

        foreach ($playerPairs as $pair) {
            $oldPlayerId = $pair['old_player_id'];
            $newPlayerId = $pair['new_player_id'];

            $acquisition = Acquisition::where('team_user_id', $userId)
                ->where('player_id', $oldPlayerId)
                ->first();

            if ($acquisition) {
                $acquisition->player_id = $newPlayerId;
                $acquisition->save();
            } else {
                return response()->json(['error' => 'Acquisition not found for the player.'], 404);
            }
        }

        $team->budget -= $totalCostDifference;
        $team->save();

        return response()->json(['success' => 'Players transferred successfully.', 'team' => $team], 200);
    }

    public function getLiveScores(Request $request)
    {
        $userId = Auth::id();

        $team = Team::where('user_id', $userId)->first();

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        $playerIds = Acquisition::where('team_user_id', $team->user_id)->pluck('player_id');

        if ($playerIds->isEmpty()) {
            return response()->json(['error' => 'No players found in the team'], 404);
        }

        $gameweekId = $this->getCurrentGameweekId();
        $response = Http::get("https://fantasy.premierleague.com/api/event/$gameweekId/live/");

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to retrieve live scores'], 500);
        }

        $liveData = $response->json();

        $playerScores = [];

        foreach ($playerIds as $playerId) {
            if (isset($liveData['elements'][$playerId])) {
                $playerScores[] = [
                    'player_id' => $playerId,
                    'score' => $liveData['elements'][$playerId]['stats']['total_points'],
                ];
            }
        }

        return response()->json($playerScores);
    }

    private function getCurrentGameweekId()
    {
        return 2;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
