<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

$createdAuthorID = 1;

class AuthorApiTest extends TestCase
{
    private $url = '/api/authors';

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_create_author()
    {
        GLOBAL $createdAuthorID;

        $data = [
            "author_name" => "Marcel Proust",
            "author_bio" => "It's nice to be nice"
        ];
        $response = $this->post("$this->url", $data);
        $createdAuthorID = $response->original['id'];

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_all_authors()
    {
        $response = $this->get("$this->url");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_author
     * @return void
     */
    public function test_can_get_author_by_id()
    {
        GLOBAL $createdAuthorID;

        $response = $this->get("$this->url/$createdAuthorID");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_cannot_get_author_by_id()
    {
        $response = $this->get("$this->url/123");

        $response->assertStatus(404);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_author
     * @return void
     */
    public function test_can_update_author()
    {
        GLOBAL $createdAuthorID;

        $data = [
            "author_name" => "Steven King",
            "author_bio" => "I am the king of horror"
        ];
        $response = $this->put("$this->url/$createdAuthorID", $data);

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_author
     * @return void
     */
    public function test_can_delete_author()
    {
        GLOBAL $createdAuthorID;

        $response = $this->delete("$this->url/$createdAuthorID");

        $response->assertStatus(200);
    }
}
