<?php

namespace App\Http\Utils;

class Filterer 
{
    public function filterBooksQuery($books, $searchCriteria) {
        $author = $searchCriteria['author'];
        $category = $searchCriteria['category'];
        $ratings = $searchCriteria['ratings'];
        $utils = new Utilities();

        if ($author) {
            $books = $books->having("books.author_id", "=", $author);
        } 
        
        if ($category) {
            $books = $books->having("books.category_id", "=", $category);
        } 
        
        if ($ratings) {
            $books = $books
            ->havingRaw("$utils->avg_ratings_book_query >= $ratings");
        }

        return $books;
    }
}