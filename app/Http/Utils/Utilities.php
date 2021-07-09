<?php

namespace App\Http\Utils;

class Utilities 
{
    // This subquery is to calculate the best discount price for a book
    public $min_discount_price_query_coalesce = "
        COALESCE (
            (SELECT MIN(discounts.discount_price) 
            FROM discounts 
            WHERE discounts.book_id = books.id 
            AND discount_start_date <= CURRENT_DATE
            AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)),
            books.book_price
        )
    ";

    // This subquery is to calculate the average ratings of a book
    public $avg_ratings_book_query = "
        (SELECT AVG (CAST (reviews.rating_start AS float))::numeric (10, 1) FROM reviews WHERE books.id = reviews.book_id)
    ";

    // This function is to generate a subquery which will calculate
    // the number of reviews of each ratings ranging from 1 to 5
    public function generateGetNumberOfReviewsQuery($ratings, $bookID) {
        return "(SELECT COUNT(reviews.id) FROM reviews WHERE 
        (CAST (reviews.rating_start AS integer)) = $ratings AND reviews.book_id = $bookID)";
    }
}