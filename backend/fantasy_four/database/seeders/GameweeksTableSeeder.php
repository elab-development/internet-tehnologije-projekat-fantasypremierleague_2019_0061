<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class GameweeksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch data from FPL API
        $response = Http::get('https://fantasy.premierleague.com/api/bootstrap-static/');
        $data = $response->json();
        $gameweeks = $data['events']; // Assuming 'events' contains gameweek info

        // Prepare data for insertion
        $gameweeksData = array_map(function($event) {
            return [
                'id' => $event['id'],
                'name' => $event['name'], // Assuming 'id' is the gameweek number
                'deadline' => $event['deadline_time'],
                'is_current' => $event['is_current'],
                'is_next' => $event['is_next']
            ];
        }, $gameweeks);

        // Insert data into the gameweeks table
        DB::table('gameweeks')->insert($gameweeksData);
    }
}
