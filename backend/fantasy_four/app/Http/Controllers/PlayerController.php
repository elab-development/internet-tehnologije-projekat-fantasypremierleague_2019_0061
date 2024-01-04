<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

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
}
