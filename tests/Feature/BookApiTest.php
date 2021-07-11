<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

$createdBookID = 1;

class BookApiTest extends TestCase
{
    private $url = '/api/books';

    private function generateDiscountURL($id) {
        return "/api/books/$id/discount";
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_create_book()
    {
        GLOBAL $createdBookID;

        $data = [
            "category_id" => 1,
            "author_id" => 1,
            "book_title" => "In Search of Lost Time",
            "book_summary" => "Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's passion for Odette. The work is incomparable.",
            "book_price" => "19.99",
            "book_cover_photo" => "book1",
        ];
        $response = $this->post("$this->url", $data);
        $createdBookID = $response->original['id'];

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_all_books()
    {
        $response = $this->get("$this->url");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_create_discount_for_book()
    {
        GLOBAL $createdBookID;

        $data = [
            "book_id" => 1,
            "discount_start_date" => "2021-07-25",
            "discount_end_date" => "2021-07-30",
            "discount_price" => "19.99"
        ];

        $response = $this->post($this->generateDiscountURL($createdBookID), $data);

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_book
     * @return void
     */
    public function test_can_get_book_by_id()
    {
        GLOBAL $createdBookID;

        $response = $this->get("$this->url/$createdBookID");

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_cannot_get_book_by_id()
    {
        $response = $this->get("$this->url/999999999");

        $response->assertStatus(404);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_book
     * @return void
     */
    public function test_can_update_book()
    {
        GLOBAL $createdBookID;

        $data = [
            "category_id" => 1,
            "author_id" => 1,
            "book_title" => "In Search of Lost Time 123",
            "book_summary" => "Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. The narrator recalls his childhood, aided by the famous madeleine; and describes M. Swann's passion for Odette. The work is incomparable.",
            "book_price" => "19.99",
            "book_cover_photo" => "book1",
        ];
        $response = $this->put("$this->url/$createdBookID", $data);

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_book
     * @return void
     */
    public function test_can_delete_book()
    {
        GLOBAL $createdBookID;

        $response = $this->delete("$this->url/$createdBookID");

        $response->assertStatus(200);
    }
}
