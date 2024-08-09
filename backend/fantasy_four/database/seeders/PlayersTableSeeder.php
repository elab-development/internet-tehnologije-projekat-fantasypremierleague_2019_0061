<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class PlayersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('players')->truncate();
        // Fetch data from FPL API
        $response = Http::get('https://fantasy.premierleague.com/api/bootstrap-static/');
        $data = $response->json();
        $players = $data['elements'];

        // Prepare data for insertion
        $playersData = array_map(function($player) {
            return [
                'id' => $player['id'],
                'name' => $player['web_name'],
                'cost' => $player['now_cost'],
                'position'=> $player['element_type'],
                'total_points' => $player['total_points'],
                'club_id' => $player['team'],
                'photo' => 'https://resources.premierleague.com/premierleague/photos/players/110x140/p' . str_replace('jpg', 'png', $player['photo'])
            ];
        }, $players);

        // Insert data into the clubs table
        DB::table('players')->insert($playersData);
    }
}
