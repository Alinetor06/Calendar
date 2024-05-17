<?php

namespace Tests\Unit\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginRegisterControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_new_user()
    {
        $userData = [
            'firstName' => 'John',
            'lastName' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123'
        ];

        $response = $this->post('/api/register', $userData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Utente creato con successo'
            ]);

        $this->assertDatabaseHas('users', [
            'firstName' => 'John',
            'lastName' => 'Doe',
            'email' => 'john.doe@example.com'
        ]);
    }

    /** @test */
    public function it_logs_in_an_existing_user()
    {
        $user = User::create([
            'firstName' => 'Jane',
            'lastName' => 'Doe',
            'email' => 'jane.doe@example.com',
            'password' => Hash::make('password123')
        ]);

        $loginData = [
            'email' => 'jane.doe@example.com',
            'password' => 'password123'
        ];

        $response = $this->post('/api/login', $loginData);

        $response->assertStatus(200)
            ->assertJson([
                'status' => true,
                'message' => 'Utente ha acceduto con successo'
            ]);

        $this->assertAuthenticated();
    }
}
