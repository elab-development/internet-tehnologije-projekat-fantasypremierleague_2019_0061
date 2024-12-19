<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('acquisitions');
        Schema::create('acquisitions', function (Blueprint $table) {
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->foreignId('player_id')->constrained()->onDelete('cascade');

            $table->primary(['team_id', 'player_id']);
        });

        Schema::dropIfExists('points');
        Schema::create('points', function (Blueprint $table) {
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->foreignId('gameweek_id')->constrained()->onDelete('cascade');
            $table->integer('total');

            $table->primary(['team_id', 'gameweek_id']);
        });

        Schema::dropIfExists('performances');
        Schema::create('performances', function (Blueprint $table) {
            $table->foreignId('player_id')->constrained()->onDelete('cascade');
            $table->foreignId('gameweek_id')->constrained()->onDelete('cascade');
            $table->integer('total');

            $table->primary(['player_id', 'gameweek_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('the_remaining_tables', function (Blueprint $table) {
            //
        });
    }
};
