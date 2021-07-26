<?php

namespace App\Http\Utils;

class Sorter 
{
    public function sortBooksQuery($books, $sortCriteria) {
        $utils = new Utilities();

        if ($sortCriteria === "onsale") {
            $books = $books->orderByRaw("
                books.book_price - $utils->min_discount_price_query_coalesce DESC
            ");
            $books = $books->orderByRaw("
                $utils->min_discount_price_query_coalesce ASC
            ");
        } else if ($sortCriteria === "popularity") {
            $books = $books->orderByRaw("
                (SELECT COUNT(reviews.id) FROM reviews WHERE reviews.book_id = books.id) DESC
            ");
            $books = $books->orderByRaw("
                $utils->min_discount_price_query_coalesce ASC
            ");
        } else if ($sortCriteria === "priceasc") {
            $books = $books->orderByRaw("
                $utils->min_discount_price_query_coalesce ASC
            ");
        } else if ($sortCriteria === "pricedesc") {
            $books = $books->orderByRaw("
                $utils->min_discount_price_query_coalesce DESC
            ");
        }

        return $books;
    } 

    public function sortReviewsQuery($reviews, $sortCriteria) {
        if ($sortCriteria === "datedesc") {
            $reviews = $reviews->orderByRaw("
                reviews.review_date DESC
            ");
        } else if ($sortCriteria === "dateasc") {
            $reviews = $reviews->orderByRaw("
                reviews.review_date ASC
            ");
        }

        return $reviews;
    } 
}