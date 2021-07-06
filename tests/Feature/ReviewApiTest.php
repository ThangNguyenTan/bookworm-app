<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

$createdReviewID = 1;

class ReviewApiTest extends TestCase
{
    private $url = '/api/reviews';

    private function generateReviewURL($id) {
        return "/api/reviews/$id/book";
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_create_review()
    {
        GLOBAL $createdReviewID;

        $data = [
            "book_id" => 137,
            "review_title" => "Nulla sollicitudin, lectus vel pulvinar laoreet, mauris nisi iaculis felis, et mattis dolor turpis id nibh.",
            "review_details" => "Nulla sollicitudin, lectus vel pulvinar laoreet, mauris nisi iaculis felis, et mattis dolor turpis id nibh. Aliquam hendrerit ipsum eget lectus convallis, in sollicitudin sem commodo. Nunc sit amet ligula a nisl molestie egestas vitae ac massa. In dictum risus eu mattis bibendum. Integer laoreet varius neque ac tristique. Cras feugiat lectus vel nulla feugiat, id dignissim augue auctor. Mauris tempor felis nibh, ut rhoncus mauris pharetra at. Aliquam et metus faucibus, aliquam augue non, tempus turpis. Phasellus gravida dui enim, luctus venenatis ligula mattis at. Curabitur sodales non erat vel blandit.",
            "rating_start" => "5"
        ];
        $response = $this->post($this->generateReviewURL(137), $data);
        $createdReviewID = $response->original['id'];

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_reviews_for_book()
    {
        $response = $this->get($this->generateReviewURL(1));

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_review
     * @return void
     */
    public function test_can_update_review()
    {
        GLOBAL $createdReviewID;

        $data = [
            "book_id" => 1,
            "review_title" => "Nulla sollicitudin, lectus vel pulvinar laoreet, mauris nisi iaculis felis, et mattis dolor turpis id nibh.12312324",
            "review_details" => "Nulla sollicitudin, lectus vel pulvinar laoreet, mauris nisi iaculis felis, et mattis dolor turpis id nibh. Aliquam hendrerit ipsum eget lectus convallis, in sollicitudin sem commodo. Nunc sit amet ligula a nisl molestie egestas vitae ac massa. In dictum risus eu mattis bibendum. Integer laoreet varius neque ac tristique. Cras feugiat lectus vel nulla feugiat, id dignissim augue auctor. Mauris tempor felis nibh, ut rhoncus mauris pharetra at. Aliquam et metus faucibus, aliquam augue non, tempus turpis. Phasellus gravida dui enim, luctus venenatis ligula mattis at. Curabitur sodales non erat vel blandit.",
            "rating_start" => "4"
        ];

        $response = $this->put("$this->url/$createdReviewID", $data);

        $response->assertStatus(200);
    }

    /**
     * A basic feature test example.
     *
     * @depends test_can_create_review
     * @return void
     */
    public function test_can_delete_review()
    {
        GLOBAL $createdReviewID;

        $response = $this->delete("$this->url/$createdReviewID");

        $response->assertStatus(200);
    }
}
