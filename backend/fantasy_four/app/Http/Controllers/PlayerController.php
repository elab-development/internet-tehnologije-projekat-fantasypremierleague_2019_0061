<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class PlayerController extends Controller
{
    public function index(){
        $response = Http::get('https://fantasy.premierleague.com/api/bootstrap-static/');

        if($response->successful()){
            $overall_data = $response->json();
            $players = $overall_data['elements'];
            return response()->json($players);
        } else{
            return response()->json(['error' => 'Failed to fetch player data'], 500);
        }
    }

    public function show(string $search_parameter)
    {
        $cache_key = 'players_' . $search_parameter;

        if (Cache::has($cache_key)) {
            $players = Cache::get($cache_key);
        } else {

            $response = Http::get('https://fantasy.premierleague.com/api/bootstrap-static/');

            if ($response->successful()) {
                $players = $response->json(['elements']);


                $filtered_players = collect($players)->filter(function ($player) use ($search_parameter) {
                    return stripos($player['first_name'] . ' ' . $player['second_name'], $search_parameter) !== false;
                })->values();

                Cache::put($cache_key, $filtered_players, now()->addHour());
                return response()->json($filtered_players);
            } else {
                return response()->json(['error' => 'Failed to fetch searched players'], 500);
            }
        }

        return response()->json($players);
    }
}


