<?php

namespace App\Http\Utils;

class CustomPagination 
{
    public function paginate(
        $totalItems,
        $currentPage = 1,
        $pageSize = 10,
        $maxPages = 6
    ) {
        $pageSize += 1;
        // calculate total pages
        $totalPages = ceil($totalItems / $pageSize);
    
        // ensure current page isn't out of range
        if ($currentPage < 1) {
            $currentPage = 1;
        } else if ($currentPage > $totalPages) {
            $currentPage = $totalPages;
        }
    
        $startPage = 0; 
        $endPage = 0;

        if ($totalPages <= $maxPages) {
            // total pages less than max so show all pages
            $startPage = 1;
            $endPage = $totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            $maxPagesBeforeCurrentPage = floor($maxPages / 2);
            $maxPagesAfterCurrentPage = ceil($maxPages / 2) - 1;
            if ($currentPage <= $maxPagesBeforeCurrentPage) {
                // current page near the start
                $startPage = 1;
                $endPage = $maxPages;
            } else if ($currentPage + $maxPagesAfterCurrentPage >= $totalPages) {
                // current page near the end
                $startPage = $totalPages - $maxPages + 1;
                $endPage = $totalPages;
            } else {
                // current page somewhere in the middle
                $startPage = $currentPage - $maxPagesBeforeCurrentPage;
                $endPage = $currentPage + $maxPagesAfterCurrentPage;
            }
        }
    
        // calculate start and end item indexes
        $startIndex = ($currentPage - 1) * $pageSize;
        $endIndex = min($startIndex + $pageSize - 1, $totalItems - 1);
    
        // create an array of pages to ng-repeat in the pager control
        $pages = array();
        
        for ($i = 0; $i < $endPage + 1 - $startPage; $i++) { 
            $pages[] = $startPage + $i;
        }

        // return object with all pager properties required by the view
        $object = json_decode(json_encode([
            'totalItems'=> $totalItems,
            'currentPage'=> $currentPage,
            'pageSize'=> $pageSize,
            'totalPages'=> $totalPages,
            'startPage'=> $startPage,
            'endPage'=> $endPage,
            'startIndex'=> $startIndex,
            'endIndex'=> $endIndex,
            'pages' => $pages
        ]), FALSE);

        return $object;
    }
}

