<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Visite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class VisiteControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_visits_for_authenticated_user()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Visite::factory()->create(['userId' => $user->id]);
        Visite::factory()->count(2)->create(); // altre visite non associate all'utente autenticato

        $response = $this->get('/visits');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'visite');
    }

    /** @test */
    public function it_searches_visits_by_criteria()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $visit = Visite::factory()->create(['userId' => $user->id]);

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
        $user = User::factory()->create();
        $this->actingAs($user);

        $visitData = [
            'name' => 'Example Name',
            'email' => 'example@example.com',
            'description' => 'Example description',
            'visit_day' => '2024-05-17',
            'priority' => 'high',
            'tel' => '123456789',
        ];

        $response = $this->post('/visits', $visitData);

        $response->assertStatus(201)
            ->assertJsonFragment(['message' => 'Visita creata']);
    }

    /** @test */
    public function it_updates_a_visit()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $visit = Visite::factory()->create(['userId' => $user->id]);

        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'description' => 'Updated description',
            'visit_day' => '2024-05-18',
            'priority' => 'low',
            'tel' => '987654321',
        ];

        $response = $this->put("/visits/{$visit->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Visita aggiornata']);
    }

    /** @test */
    public function it_deletes_a_visit()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $visit = Visite::factory()->create(['userId' => $user->id]);

        $response = $this->delete("/visits/{$visit->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['message' => 'Visita eliminata con successo']);
    }
}
