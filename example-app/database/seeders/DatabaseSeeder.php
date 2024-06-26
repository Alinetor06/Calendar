<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Visite;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'firstName' => 'Test User',
            'lastName' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('casuale1234!'),
        ]);

        Visite::factory(10)->create();

    }
}
