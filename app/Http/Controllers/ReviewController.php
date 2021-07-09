<?php

namespace App\Http\Controllers;

use App\Http\Utils\Sorter;
use App\Http\Utils\Utilities;
use App\Models\Review;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id, Request $request)
    {
        $utils = new Utilities();
        $sorter = new Sorter();

        $ratings = $request->input('ratings') ?: 0;
        $pageSize = intval($request->input('page-size')) ?: 15;
        $sortCriteria = $request->input('sort') ?: "datedesc";

        $q1 = $utils->generateGetNumberOfReviewsQuery(1, $id);
        $q2 = $utils->generateGetNumberOfReviewsQuery(2, $id);
        $q3 = $utils->generateGetNumberOfReviewsQuery(3, $id);
        $q4 = $utils->generateGetNumberOfReviewsQuery(4, $id);
        $q5 = $utils->generateGetNumberOfReviewsQuery(5, $id);

        $reviews = DB::table("reviews")
        ->selectRaw("
            *
        ")
        ->where('reviews.book_id', '=', $id);

        if ($ratings != 0) {
            $reviews = $reviews->where('reviews.rating_start', "=", $ratings);
        }

        $reviews = $sorter->sortReviewsQuery($reviews, $sortCriteria);
        $reviews = $reviews->paginate($pageSize);

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
        
        return response([
            "reviews" => $reviews,
            "reviewsStatus" => $reviewsStatus
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'book_id' => 'required',
            'review_title' => 'required|max:120',
            'rating_start' => 'required|max:255',
        ]);

        $review = new Review();
        
        $review->book_id = $request->book_id;
        $review->review_title = $request->review_title;
        $review->review_details = $request->review_details;
        $review->rating_start = $request->rating_start;
        $review->review_date = date("Y-m-d H:i:s");

        $review->save();
        
        return response($review);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $bookID
     * @return \Illuminate\Http\Response
    public function getReviewsByBookID($bookID)
    {
        //
        $reviews = Review::where('book_id', $bookID)->get();

        return response($reviews);
    }
     */

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $review = Review::findOrFail($id);

        return response($review);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'book_id' => 'required',
            'review_title' => 'required|max:120',
            'rating_start' => 'required|max:255',
        ]);

        $review->book_id = $request->book_id;
        $review->review_title = $request->review_title;
        $review->review_details = $request->review_details;
        $review->rating_start = $request->rating_start;
        //$review->review_date = $review->review_date;

        $review->save();
        
        return response($review);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $review = Review::findOrFail($id);

        $review->delete();

        return response($review);
    }
}
