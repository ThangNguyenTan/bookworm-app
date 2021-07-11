<?php

namespace App\Http\Business;

use App\Http\Utils\Utilities;
use Illuminate\Support\Facades\DB;

class BookBusiness
{
    public function fetchRequiredFieldsForShop() {
        $utils = new Utilities();

        $array = [
            "books.*",
            "authors.id AS author_id", 
            "authors.author_name AS author_name", 
            "categories.id AS category_id", 
            "$utils->min_discount_price_query_coalesce AS discount_price"
        ];
        $comma_separated = implode(",", $array);

        $books = DB::table("books")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->join("authors", "books.author_id", "=", "authors.id")
        ->join("categories", "books.category_id", "=", "categories.id")
        ->selectRaw($comma_separated)
        ->groupBy("books.id", "authors.id", "categories.id");

        return $books;
    }
}