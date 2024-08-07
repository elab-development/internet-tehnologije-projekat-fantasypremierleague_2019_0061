<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Acquisition;
use App\Models\Team;
use App\Models\Player;
use Illuminate\Support\Facades\Auth;

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
    $userId = Auth::id(); // Get the currently logged-in user's ID
    $team = Team::find($userId); // Find the team using the user_id as the primary key

    // Validate if team exists
    if (!$team) {
        return response()->json(['error' => 'Team not found for the current user.'], 404);
    }

    // Validate the number of player IDs
    if (count($playerIds) !== 4) {
        return response()->json(['error' => 'Exactly four player IDs are required.'], 400);
    }

    $totalCost = 0;
    $positions = [];

    foreach ($playerIds as $playerId) {
        $player = Player::find($playerId);

        if (!$player) {
            return response()->json(['error' => 'Player not found.'], 404);
        }

        // Check if the player's position is unique among the acquisitions
        if (in_array($player->position, $positions)) {
            return response()->json(['error' => 'Each player must have a unique position.'], 400);
        }

        $positions[] = $player->position;
        $totalCost += $player->cost;
    }

    // Check if the total cost is within the budget limit
    if ($totalCost > 1000) {
        return response()->json(['error' => 'Total cost exceeds the budget limit of 1000.'], 400);
    }

    // Store acquisitions
    foreach ($playerIds as $playerId) {
        $newAcquisition = new Acquisition();
        $newAcquisition->player_id = $playerId;
        $newAcquisition->team_id = $userId; // Use the user ID as the team ID
        $newAcquisition->save();
    }

    // Deduct the total cost from the team's budget
    $team->budget -= $totalCost;
    $team->is_valid = true;
    $team->save();

    return response()->json(['success' => 'Acquisitions stored successfully.', 'team' => $team], 201);
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
