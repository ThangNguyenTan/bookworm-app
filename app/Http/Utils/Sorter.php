<?php

namespace App\Http\Utils;

class Sorter 
{
    public function sortBooks($books, $sortCriteria) {
        switch ($sortCriteria) {
            case 'onsale':
                $books = $this->sortByOnSale($books);
                break;
            case 'popularity':
                $books = $this->sortByPopularity($books);
                break;
            case 'priceasc':
                $books = $this->sortByPriceAsc($books);
                break;
            case 'pricedesc':
                $books = $this->sortByPriceDesc($books);
                break;
            default:
                break;
        }

        return $books;
    }

    public function sortByOnSale($books) {
        $calculator = new Calculation();

        uasort($books, function($a, $b) use (&$calculator) {
            return $calculator->calculateDiscountPriceDiff($b) - $calculator->calculateDiscountPriceDiff($a);
        });
    
        return $books;
    }

    public function sortByPopularity($books) {
        uasort($books, function($a, $b) {
            if (count($b['reviews']) === count($a['reviews'])) {
                return $a['discount_price'] - $b['discount_price'];
            }
            return count($b['reviews']) - count($a['reviews']);
        });
    
        return $books;
    }

    public function sortByPriceAsc($books) {
        uasort($books, function($a, $b) {
            return $a['discount_price'] - $b['discount_price'];
        });
    
        return $books;
    }

    public function sortByPriceDesc($books) {
        uasort($books, function($a, $b) {
            return $b['discount_price'] - $a['discount_price'];
        });
    
        return $books;
    }

    public function sortByRatings($books) {
        uasort($books, function($a, $b) {
            if ($b['ratings'] === $a['ratings']) {
                return $a['discount_price'] - $b['discount_price'];
            }
            return $b['ratings'] - $a['ratings'];
        });

        return $books;
    }

    public function sortDiscountItems($discounts) {
        if (count($discounts) > 1) {
            uasort($discounts, function($a, $b) {
                return $a['discount_price'] - $b['discount_price'];
            });
        }
    
        return $discounts;
    }
}