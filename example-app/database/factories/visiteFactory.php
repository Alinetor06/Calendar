<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\visite>
 */
class visiteFactory extends Factory
{


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        // Imposta la data massima come un mese dopo la data corrente
        $maxDate = Carbon::now()->addMonth();
        // Genera una data casuale nell'intervallo tra la data corrente e la data massima

        return [
            'name' => fake()->realText(2),
            'età' => fake()->numberBetween(1, 80),
            'note' => fake()->realText(200),
            'giorno della visita' => fake()->dateTimeBetween(Carbon::now(), $maxDate),
            'importanza' => fake()->numberBetween(1, 3),
        ];
    }
}
