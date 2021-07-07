<?php

namespace App\Http\Utils;

class Filterer 
{
    public function filterBooksByAuthor($books, $authorID) {
        return array_filter($books, function($book) use (&$authorID) {
            return $book['author_id'] == $authorID;
        });
    }

    public function filterBooksByCategory($books, $categoryID) {
        return array_filter($books, function($book) use (&$categoryID) {
            return $book['category_id'] == $categoryID;
        });
    }

    public function filterBooksByRatings($books, $ratings) {
        return array_filter($books, function($book) use (&$ratings) {
            return $book['ratings'] >= $ratings;
        });
    }

    public function dateToMiliseconds($dateStr) {
        if ($dateStr === "now") {
            return round(microtime(true) * 1000);
        }
        return strtotime($dateStr) * 1000;
    }

    public function filterDiscountItems($discounts) {
        return array_filter($discounts, function($discount) {
            return (
                $this->dateToMiliseconds($discount['discount_start_date']) >= $this->dateToMiliseconds("now") &&
                    (!$discount['discount_end_date'] ||
                $this->dateToMiliseconds($discount['discount_end_date']) < $this->dateToMiliseconds("now"))
            );
        });
    }

    public function filterBooks($books, $searchCriteria) {
        $author = $searchCriteria['author'] ?: false;
        $category = $searchCriteria['category'] ?: false;
        $ratings = $searchCriteria['ratings'] ?: false;

        if ($author) {
            $books = $this->filterBooksByAuthor($books, $author);
        }

        if ($category) {
            $books = $this->filterBooksByCategory($books, $category);
        }

        if ($ratings) {
            $books = $this->filterBooksByRatings($books, $ratings);
        }

        return $books;
    } 
}