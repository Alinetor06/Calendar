<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class LoginRegisterTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test registrazione di un nuovo utente.
     *
     * @return void
     */
    public function testUserRegistration()
    {
        $userData = [
            'firstName' => 'John',
            'lastName' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123'
        ];

        $response = $this->json('POST', '/api/register', $userData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'token'
            ]);
    }

}
