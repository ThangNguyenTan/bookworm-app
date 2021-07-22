<?php

namespace App\Http\Business;

use App\Http\Utils\Sorter;
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

    public function fetchRequiredFieldsForHome() {
        $utils = new Utilities();

        $array = [
            "books.*",
            "authors.id AS author_id", 
            "authors.author_name AS author_name", 
            "$utils->min_discount_price_query_coalesce AS discount_price"
        ];
        $comma_separated = implode(",", $array);

        $books = DB::table("books")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->join("authors", "books.author_id", "=", "authors.id")
        ->selectRaw($comma_separated)
        ->groupBy("books.id", "authors.id");

        return $books;
    }

    public function fetchRequiredFieldsOfOnSaleBooks() {
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
        ->join("discounts", "books.id", "=", "discounts.book_id")
        ->join("authors", "books.author_id", "=", "authors.id")
        ->join("categories", "books.category_id", "=", "categories.id")
        ->selectRaw($comma_separated)
        ->groupBy("books.id", "authors.id", "categories.id", "discounts.discount_start_date", "discounts.discount_end_date");

        return $books;
    }

    public function appendHavingToOnSaleBooks($books) {
        // Since discount item contains start and end date,
        // Therefore, only books that have available discounts can be fetched
        $books->havingRaw("
            discounts.discount_start_date <= CURRENT_DATE
            AND (discounts.discount_end_date IS NULL OR discounts.discount_end_date >= CURRENT_DATE)
        ");

        return $books;
    }

    public function getOnSaleBooks($limit){
        $sorter = new Sorter();

        // Filter the books by on sale
        // i.e. the difference between book price and discount price. 
        // The higher the difference the higher the rankings
        $onSaleBooks = $this->fetchRequiredFieldsOfOnSaleBooks();
        $onSaleBooks = $sorter->sortBooksQuery($onSaleBooks, "onsale");
        $onSaleBooks = $sorter->sortBooksQuery($onSaleBooks, "priceasc");
        $onSaleBooks = $onSaleBooks
        ->skip(0)
        ->take($limit)
        ->get()
        ;

        return $onSaleBooks;
    }

    public function getPopularBooks($limit){
        $sorter = new Sorter();

        // Filter the books by popularity
        // i.e. number of reviews. 
        // The more the reviews the higher the rankings
        $popularBooks = $this->fetchRequiredFieldsForHome();
        $popularBooks = $sorter->sortBooksQuery($popularBooks, "popularity");
        $popularBooks = $sorter->sortBooksQuery($popularBooks, "priceasc");
        $popularBooks = $popularBooks
        ->skip(0)
        ->take($limit)
        ->get()
        ;

        return $popularBooks;
    }

    public function getHighlyRatedBooks($limit){
        $sorter = new Sorter();
        $utils = new Utilities();

        // Filter the books by average ratings
        // The higher the ratings the higher the rankings
        $highlyRatedBooks = $this->fetchRequiredFieldsForHome();
        $highlyRatedBooks = $highlyRatedBooks
        ->orderByRaw("
            $utils->avg_ratings_book_query DESC
        ");
        $highlyRatedBooks = $sorter->sortBooksQuery($highlyRatedBooks, "priceasc");
        $highlyRatedBooks = $highlyRatedBooks
        ->skip(0)
        ->take($limit)
        ->get()
        ;

        return $highlyRatedBooks;
    }
}