<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::all();
        return response()->json($teams);
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
         // Validate the request data
         $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Retrieve the ID of the currently authenticated user
        $userId = Auth::id();

        $team = new Team();
        $team->user_id = $userId;
        $team->name = $validated['name'];
        $team->budget = 300.0;
        $team->is_valid = false;

        $team->save();

        // Return a JSON response with the created team
        return response()->json($team, 201);
    }

    public function getUserTeam(Request $request)
{
    $userId = Auth::id();

    $team = Team::where('user_id', $userId)->first();

    if ($team) {
        return response()->json($team);
    } else {
        return response()->json(['message' => 'No team found for this user.'], 404);
    }
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Find the team by ID
        $team = Team::find($id);

        // Check if the team exists
        if (!$team) {
            // Return a 404 response if not found
            return response()->json(['message' => 'Team not found'], 404);
        }

        // Return the team data as a JSON response
        return response()->json($team);
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
