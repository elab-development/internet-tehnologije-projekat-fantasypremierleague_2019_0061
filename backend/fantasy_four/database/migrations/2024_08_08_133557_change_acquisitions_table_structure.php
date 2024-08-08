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
            $table->id();
            $table->foreignId('team_user_id')->constrained('teams', 'user_id')->onDelete('cascade');
            $table->foreignId('player_id')->constrained()->onDelete('cascade');
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
