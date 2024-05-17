<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('visites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('user')->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('description');
            $table->date('visit_day');
            $table->integer('priority');
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visites');
    }
};
