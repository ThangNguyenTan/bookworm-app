<?php

namespace App\Http\Resources;

use App\Http\Utils\Calculation;
use Illuminate\Http\Resources\Json\JsonResource;

class BookCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'book_title' => $this->book_title,
            'book_summary' => $this->book_summary,
            'book_price' => $this->book_price,
            'discount_price' => $this->discount_price,
            'book_cover_photo' => $this->book_cover_photo,
            'category_id' => $this->category_id,
            'author' => [
                'id' => $this->author->id,
                'author_name' => $this->author->author_name,
            ],
            'reviews_count' => $this->reviews_count,
            'ratings' => $this->ratings
            //'discounts' => $this->discounts
        ];
    }
}
