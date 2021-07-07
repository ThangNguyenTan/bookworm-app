<?php

namespace App\Http\Utils;

class Sorter 
{
    public function sortBooks($books, $sortCriteria) {

    }

    public function sortByOnSale($books) {
        
    }

    public function sortByPopularity($books) {
        
    }

    public function sortByPrice($books) {
        
    }

    public function sortDiscountItems($discounts) {
        if (count($discounts) > 1) {
            array_filter($discounts, function($a, $b) {
                return $a['discount_price'] - $b['discount_price'];
            });
        }
    
        return $discounts;
    }
}