<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ClubsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch data from FPL API
        $response = Http::get('https://fantasy.premierleague.com/api/bootstrap-static/');
        $data = $response->json();
        $teams = $data['teams'];

        // Prepare data for insertion
        $clubs = array_map(function($team) {
            return [
                'id' => $team['id'],
                'name' => $team['name']
            ];
        }, $teams);

        // Insert data into the clubs table
        DB::table('clubs')->insert($clubs);
    }
}
