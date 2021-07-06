<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

$createdOrderID = 1;

class OrderApiTest extends TestCase
{
    private $url = '/api/orders';

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_create_order()
    {
        GLOBAL $createdOrderID;

        $data = [
            "order_amount" => 250,
            "order_items" => [
                [
                    "bookID" => 1,
                    "quantity" => 2,
                    "price" => 25
                ],
                [
                    "bookID" => 2,
                    "quantity" => 5,
                    "price" => 20
                ],
                [
                    "bookID" => 3,
                    "quantity" => 5,
                    "price" => 20
                ]
            ]
        ];
        $response = $this->post("$this->url", $data);
        $createdOrderID = $response->original['id'];

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_all_orders()
    {
        $response = $this->get("$this->url");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_order
     * @return void
     */
    public function test_can_get_order_by_id()
    {
        GLOBAL $createdOrderID;

        $response = $this->get("$this->url/$createdOrderID");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_cannot_get_order_by_id()
    {
        $response = $this->get("$this->url/1000");

        $response->assertStatus(404);
    }

}
