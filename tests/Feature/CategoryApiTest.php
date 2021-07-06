<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

$createdCategoryID = 1;

class CategoryApiTest extends TestCase
{
    private $url = '/api/categories';

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_create_category()
    {
        GLOBAL $createdCategoryID;

        $data = [
            "category_name" => "Action",
            "category_desc" => "It's nice to be nice"
        ];
        $response = $this->post("$this->url", $data);
        $createdCategoryID = $response->original['id'];

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_all_categories()
    {
        $response = $this->get("$this->url");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_category
     * @return void
     */
    public function test_can_get_category_by_id()
    {
        GLOBAL $createdCategoryID;

        $response = $this->get("$this->url/$createdCategoryID");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_cannot_get_category_by_id()
    {
        $response = $this->get("$this->url/123");

        $response->assertStatus(404);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_category
     * @return void
     */
    public function test_can_update_category()
    {
        GLOBAL $createdCategoryID;

        $data = [
            "category_name" => "Horror",
            "category_desc" => "Man I am scared"
        ];
        $response = $this->put("$this->url/$createdCategoryID", $data);

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_category
     * @return void
     */
    public function test_can_delete_category()
    {
        GLOBAL $createdCategoryID;

        $response = $this->delete("$this->url/$createdCategoryID");

        $response->assertStatus(200);
    }
}
