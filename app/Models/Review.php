<?php

namespace App\Models;

use App\Http\Utils\Utilities;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Review extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'rating_start' => 'float',
    ];

    public $timestamps = false;

    public function Book()
    {
        return $this->belongsTo(Book::class);
    }

    public function fetchReviewsStatus($id) {
        $utils = new Utilities();

        $q1 = $utils->generateGetNumberOfReviewsQuery(1, $id);
        $q2 = $utils->generateGetNumberOfReviewsQuery(2, $id);
        $q3 = $utils->generateGetNumberOfReviewsQuery(3, $id);
        $q4 = $utils->generateGetNumberOfReviewsQuery(4, $id);
        $q5 = $utils->generateGetNumberOfReviewsQuery(5, $id);

        $reviewsStatus = DB::table("books")
        ->join("reviews", "reviews.book_id", "=", "books.id")
        ->selectRaw("
            DISTINCT books.id as book_id,
            $q1 AS numberOf1StarReviews,
            $q2 AS numberOf2StarReviews,
            $q3 AS numberOf3StarReviews,
            $q4 AS numberOf4StarReviews,
            $q5 AS numberOf5StarReviews,
            $utils->avg_ratings_book_query AS ratings
        ")
        ->groupBy("books.id", "reviews.book_id", "reviews.rating_start")
        ->having('reviews.book_id', '=', $id);
        $reviewsStatus = $reviewsStatus->get();

        return $reviewsStatus;
    }
}
