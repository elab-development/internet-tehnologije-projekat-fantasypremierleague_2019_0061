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
            $table->foreignId('team_id')->constrained('teams', 'user_id')->onDelete('cascade');
            $table->foreignId('player_id')->constrained()->onDelete('cascade');

            $table->primary(['team_id', 'player_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
