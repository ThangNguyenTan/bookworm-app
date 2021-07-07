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
                $books = $this->sortByPrice($books);
                break;
            case 'pricedesc':
                $books = array_reverse($this->sortByOnSale($books));
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
            return count($b['reviews']) - count($a['reviews']);
        });
    
        return $books;
    }

    public function sortByPrice($books) {
        uasort($books, function($a, $b) {
            return $a['discount_price'] - $b['discount_price'];
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