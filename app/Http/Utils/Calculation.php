<?php

namespace App\Http\Utils;

class Calculation 
{
    protected $filterer;
    protected $sorter;

    public function __construct()
    {
        $this->filterer = new Filterer();
        $this->sorter = new Sorter();
    }

    public function calculateRatings($reviews) {
        $numberOf1StarReviews = [];
        $numberOf2StarReviews = [];
        $numberOf3StarReviews = [];
        $numberOf4StarReviews = [];
        $numberOf5StarReviews = [];

        foreach ($reviews as $index => $review) {
            switch ($review['rating_start']) {
                case '1':
                    $numberOf1StarReviews[] = $review;
                    break;
                case "2":
                    $numberOf2StarReviews[] = $review;
                    break;
                case "3":
                    $numberOf3StarReviews[] = $review;
                    break;
                case "4":
                    $numberOf4StarReviews[] = $review;
                    break;
                case "5":
                    $numberOf5StarReviews[] = $review;
                    break;
                default:
                    break;
            }
        }

        $a = count($numberOf1StarReviews);
        $b = count($numberOf2StarReviews);
        $c = count($numberOf3StarReviews);
        $d = count($numberOf4StarReviews);
        $e = count($numberOf5StarReviews);

        $totalReviews = ($a + $b + $c + $d + $e);

        if ($totalReviews === 0) {
            return 0;
        } 

        $ratings = (1 * $a + 2 * $b + 3 * $c + 4 * $d + 5 * $e) / ($a + $b + $c + $d + $e);
        $ratings = number_format($ratings, 1, '.', '');

        return $ratings;
    }

    public function calculateDiscountPrice($book) {
        $discounts = $book['discounts'];
        $book_price = $book['book_price'];
        $finalPrice = $book_price;

        $sortedDiscounts = $this->filterer->filterDiscountItems($discounts);

        if (count($sortedDiscounts) > 0) {
            $sortedDiscounts = $this->sorter->sortDiscountItems($sortedDiscounts);

            $finalPrice = $sortedDiscounts[0]['discount_price'];
        }

        return $finalPrice;
    }

    public function calculateRatingsForBooks($books) {
        foreach ($books as $index => $book) {
            $books[$index]['ratings'] = $this->calculateRatings($book['reviews']);
        }

        return $books;
    }

    public function calculateFinalPriceForBooks($books) {
        foreach ($books as $index => $book) {
            $books[$index]['discount_price'] = $this->calculateDiscountPrice($book);
        }

        return $books;
    }
}