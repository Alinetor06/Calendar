<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Visite;
use App\Models\User;

class VisiteControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        // Popola il database con dati di esempio
        User::factory()->create();
        Visite::factory()->count(5)->create();
    }

    /** @test */
    public function it_returns_visits_for_authenticated_user()
    {
        // Simula un utente autenticato
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get('/visits');

        $response->assertStatus(200)
            ->assertJsonCount(5, 'visite');
    }

    /** @test */
    public function it_searches_visits_by_criteria()
    {
        // Simula un utente autenticato
        $user = User::factory()->create();
        $this->actingAs($user);

        $visit = Visite::first();

        $response = $this->post('/visits/search', [
            'name' => $visit->user->name,
            'email' => $visit->user->email,
            'visit_day' => $visit->visit_day,
        ]);

        $response->assertStatus(200)
            ->assertJsonCount(1, 'visite')
            ->assertJsonFragment(['name' => $visit->user->name]);
    }

    /** @test */
    public function it_stores_a_visit()
    {
        // Simula un utente autenticato
        $user = User::factory()->create();
        $this->actingAs($user);

        $visitData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'description' => $this->faker->sentence,
            'visit_day' => $this->faker->date(),
            'priority' => 'high',
            'tel' => $this->faker->phoneNumber,
        ];

        $response = $this->post('/visits', $visitData);

        $response->assertStatus(201)
            ->assertJsonFragment(['message' => 'Visita creata']);
    }

    /** @test */
    public function it_updates_a_visit()
    {
        // Simula un utente autenticato
        $user = User::factory()->create();
        $this->actingAs($user);

        $visit = Visite::first();
        $updateData = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'description' => $this->faker->sentence,
            'visit_day' => $this->faker->date(),
            'priority' => 'low',
            'tel' => $this->faker->phoneNumber,
        ];

        $response = $this->put("/visits/{$visit->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Visita aggiornata']);
    }

    /** @test */
    public function it_deletes_a_visit()
    {
        // Simula un utente autenticato
        $user = User::factory()->create();
        $this->actingAs($user);

        $visit = Visite::first();

        $response = $this->delete("/visits/{$visit->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Visita eliminata con successo']);
    }
}
