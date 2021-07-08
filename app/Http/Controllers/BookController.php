<?php

namespace App\Http\Controllers;

use App\Http\Utils\CustomPagination;
use App\Http\Utils\Filterer;
use App\Http\Utils\Calculation;
use App\Http\Utils\Sorter;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $customPagination = new CustomPagination();
        $filterer = new Filterer();
        $calculator = new Calculation();
        $sorter = new Sorter();

        $books = Book::with("Reviews", "Author", "Category", "Discounts")->get();

        if (!$request->input('page')) {
            return response($books);
        }

        $currentPage = intval($request->input('page')) ?: 1;
        $pageSize = intval($request->input('page-size')) ?: 15;
        $author = $request->input('author') ?: false;
        $category = $request->input('category') ?: false;
        $ratings = $request->input('ratings') ?: false;
        $sortCriteria = $request->input('sort') ?: false;

        $searchCriteria = [
            'author' => $author,
            'category' => $category,
            'ratings' => $ratings
        ];

        $books = $books->toArray();

        $books = $calculator->calculateRatingsForBooks($books);

        $books = $filterer->filterBooks($books, $searchCriteria);

        $books = $calculator->calculateFinalPriceForBooks($books);

        $books = $sorter->sortBooks($books, $sortCriteria);

        $pageObject = $customPagination->paginate(count($books), $currentPage, $pageSize);
        
        $books = array_slice($books, intval($pageObject->startIndex), intval($pageObject->pageSize));

        return response([
            "data" => $books,
            "total" => count($books),
            "pageObject" => $pageObject
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    public function getBookTest(Request $request)
    {
        $customPagination = new CustomPagination();
        $calculator = new Calculation();
        $sorter = new Sorter();

        $currentPage = intval($request->input('page')) ?: 1;
        $pageSize = intval($request->input('page-size')) ?: 15;
        $author = $request->input('author') ?: false;
        $category = $request->input('category') ?: false;
        $ratings = $request->input('ratings') ?: false;
        $sortCriteria = $request->input('sort') ?: false;

        $books = DB::table("books");

        if ($author) {
            $books = DB::table("books")
            ->join("authors", "books.author_id", "=", "authors.id")
            ->select("books.id", "authors.id")
            ->groupBy("books.id", "authors.id")
            ->having("authors.id", "=", $author)
            ->get();
        } else if ($category) {
            $books = DB::table("books")
            ->join("categories", "books.author_id", "=", "categories.id")
            ->selectRaw("books.*")
            ->groupBy("books.id", "categories.id")
            ->having("books.category_id", "=", $category)
            ->get();
        } else if ($ratings) {
            $books = DB::table("books")
            ->join("reviews", "books.id", "=", "reviews.book_id")
            ->join("authors", "books.author_id", "=", "authors.id")
            ->join("categories", "books.category_id", "=", "categories.id")
            ->selectRaw("books.* AS book_id, 
            authors.id AS author_id,
            categories.id AS category_id,
            COUNT(CASE WHEN reviews.rating_start = '1' THEN 1 END) AS number_of_1_star_review,
            COUNT(CASE WHEN reviews.rating_start = '2' THEN 1 END) AS number_of_2_star_review,
            COUNT(CASE WHEN reviews.rating_start = '3' THEN 1 END) AS number_of_3_star_review,
            COUNT(CASE WHEN reviews.rating_start = '4' THEN 1 END) AS number_of_4_star_review,
            COUNT(CASE WHEN reviews.rating_start = '5' THEN 1 END) AS number_of_5_star_review,
            COUNT(reviews.id) AS total_reviews,
            (COUNT(CASE WHEN reviews.rating_start = '1' THEN 1 END) * 1 + COUNT(CASE WHEN reviews.rating_start = '2' THEN 1 END) * 2
            + COUNT(CASE WHEN reviews.rating_start = '3' THEN 1 END) * 3 + COUNT(CASE WHEN reviews.rating_start = '4' THEN 1 END) * 4
            + COUNT(CASE WHEN reviews.rating_start = '5' THEN 1 END) * 5) / COUNT(reviews.id) AS ratings")
            ->groupBy("books.id", "authors.id", "categories.id")
            ->havingRaw("(COUNT(CASE WHEN reviews.rating_start = '1' THEN 1 END) * 1 + COUNT(CASE WHEN reviews.rating_start = '2' THEN 1 END) * 2
            + COUNT(CASE WHEN reviews.rating_start = '3' THEN 1 END) * 3 + COUNT(CASE WHEN reviews.rating_start = '4' THEN 1 END) * 4
            + COUNT(CASE WHEN reviews.rating_start = '5' THEN 1 END) * 5) / COUNT(reviews.id) >= $ratings")
            ->get();
        }

        // $searchCriteria = [
        //     'author' => $author,
        //     'category' => $category,
        //     'ratings' => $ratings
        // ];

        $books = $books->toArray();

        foreach ($books as $index => $book) {
            $discounts = DB::table('discounts')
            ->join("books", "discounts.book_id", "=", "books.id")
            ->selectRaw("discounts.* AS discounts")
            ->groupBy("discounts.id")
            ->having("discounts.book_id", "=", $book->id)
            ->get()
            ->toArray();

            $reviews = DB::table('reviews')
            ->join("books", "reviews.book_id", "=", "books.id")
            ->selectRaw("reviews.* AS reviews")
            ->groupBy("reviews.id")
            ->having("reviews.book_id", "=", $book->id)
            ->get()
            ->toArray();

            $book->discounts = $discounts;
            $book->reviews = $reviews;

            $book = json_decode(json_encode($book), true);
            $books[$index] = $book;
        }

        $books = $calculator->calculateRatingsForBooks($books);

        $books = $calculator->calculateFinalPriceForBooks($books);

        $books = $sorter->sortBooks($books, $sortCriteria);

        $pageObject = $customPagination->paginate(count($books), $currentPage, $pageSize);
        
        $books = array_slice($books, intval($pageObject->startIndex), intval($pageObject->pageSize));

        return response([
            "data" => $books,
            "total" => count($books),
            "pageObject" => $pageObject
        ]);
    }
     */

    /**
     * Display a listing of reccomendation for the books
     *
     * @query: page, page-size, author, category, ratings, sort
     * @return \Illuminate\Http\Response
     */
    public function getBookRec(Request $request)
    {
        $sorter = new Sorter();
        $calculator = new Calculation();

        $books = Book::with('Author', 'Category', "Discounts", "Reviews")->get()->toArray();

        $books = $calculator->calculateFinalPriceForBooks($books);
        $books = $calculator->calculateRatingsForBooks($books);

        $popularBooks = array_slice($sorter->sortByPopularity($books), 0, 8);
        $onSaleBooks = array_slice($sorter->sortByOnSale($books), 0, 10);
        $highlyRatedBooks = array_slice(
            //array_reverse($sorter->sortByRatings($books))
            $sorter->sortByRatings($books)
            , 0
            , 8
        );
        
        return response([
            'popularBooks' => $popularBooks,
            'onSaleBooks' => $onSaleBooks,
            'highlyRatedBooks' => $highlyRatedBooks,
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
            'category_id' => 'required',
            'author_id' => 'required',
            'book_title' => 'required|max:255',
            'book_summary' => 'required',
            'book_price' => 'required',
        ]);

        $book = new Book();
        
        $book->category_id = $request->category_id;
        $book->author_id = $request->author_id;
        $book->book_title = $request->book_title;
        $book->book_summary = $request->book_summary;
        $book->book_price = $request->book_price;
        $book->book_cover_photo = $request->book_cover_photo;

        $book->save();
        
        return response($book);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        //$book = Book::with('Author', 'Category')->get()->where('id', '=', $id)->firstOrFail();
        $book = Book::findOrFail($id);

        $book->Author;
        $book->Category;
        $book->Discounts;

        return response($book);
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
        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'category_id' => 'required',
            'author_id' => 'required',
            'book_title' => 'required|max:255',
            'book_summary' => 'required',
            'book_price' => 'required',
        ]);

        $book->category_id = $request->category_id;
        $book->author_id = $request->author_id;
        $book->book_title = $request->book_title;
        $book->book_summary = $request->book_summary;
        $book->book_price = $request->book_price;
        $book->book_cover_photo = $request->book_cover_photo;

        $book->save();

        $book = Book::findOrFail($id);

        $book->author = $book->Author;
        $book->category = $book->Category;

        return response($book);
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
        $book = Book::findOrFail($id);

        $book->delete();

        return response($book);
    }
}
