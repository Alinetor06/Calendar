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
     * Test di accesso di un utente registrato.
     *
     * @return void
     */
    public function testUserLogin()
    {
        $user = User::factory()->create([
            'email' => 'jane.doe@example.com',
            'password' => bcrypt('password123'),
        ]);

        $loginData = [
            'email' => 'jane.doe@example.com',
            'password' => 'password123'
        ];

        $response = $this->json('POST', '/api/login', $loginData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'token'
            ]);
    }
}
