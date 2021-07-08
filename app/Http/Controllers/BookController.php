<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Http\Utils\CustomPagination;
use App\Http\Utils\Filterer;
use App\Http\Utils\Calculation;
use App\Http\Utils\Sorter;
use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
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
        $sorter = new Sorter();

        $books = Book::with(["Author" => function($query) {
            $query->select("id", "author_name");
        }, "Category" => function($query) {
            $query->select("id");
        }])
        ->without(['BestDiscount', 'Reviews'])
        ->withCount("Reviews");

        // If no current page specified return the whole model
        // We get all data and let the front-end do the work
        if (!$request->input('page')) {
            $books = $books->get();
            return response(BookCollection::collection($books));
            //return response($books);
        }

        // This part focuses on resolving data with back-end code
        // Instead of letting the front-end to do anything we resolve everything back here
        $currentPage = intval($request->input('page')) ?: 1;
        $pageSize = intval($request->input('page-size')) ?: 15;
        $author = $request->input('author') ?: false;
        $category = $request->input('category') ?: false;
        $ratings = $request->input('ratings') ?: false;
        $sortCriteria = $request->input('sort') ?: false;

        // $searchCriteria = [
        //     'author' => $author,
        //     'category' => $category,
        //     'ratings' => $ratings
        // ];

        // Filter books
        //$books = $filterer->filterBooks($books, $searchCriteria);
        if ($author) {
            $books->where('author_id', '=', $author);
            $books = $books->get();
            $books = $books->toArray();
        } else if ($category) {
            $books->where('category_id', '=', $category);
            $books = $books->get();
            $books = $books->toArray();
        } else if ($ratings) {
            $books = $books->get();
            $books = $books->toArray();
            $books = $filterer->filterBooksByRatings($books, $ratings);
        } else {
            $books = $books->get();
            $books = $books->toArray();
        }
        
        // Sort books
        $books = $sorter->sortBooks($books, $sortCriteria);

        // Create custom pagination allows front-end to display
        $pageObject = $customPagination->paginate(count($books), $currentPage, $pageSize);
        
        // Slice the correct books based on the custom pagination
        $books = array_slice($books, intval($pageObject->startIndex), intval($pageObject->pageSize));

        foreach ($books as $index => $book) {
            unset($book['reviews']);
            unset($book['best_discount']);
            $books[$index] = $book;
        }

        return response([
            "data" => $books,
            "pageObject" => $pageObject
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getBookTest(Request $request)
    {
        $pageSize = intval($request->input('page-size')) ?: 15;
        $author = $request->input('author') ?: false;
        $category = $request->input('category') ?: false;
        $ratings = $request->input('ratings') ?: false;
        $sortCriteria = $request->input('sort') ?: false;

        $books = DB::table("books")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->join("authors", "books.author_id", "=", "authors.id")
        ->join("categories", "books.category_id", "=", "categories.id")
        ->selectRaw("
            books.*,
            authors.id AS author_id, 
            authors.author_name AS author_name, 
            categories.id AS category_id, 
            (CASE 
            WHEN 
                (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) IS NULL 
            THEN 
                books.book_price 
            WHEN 
                (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) IS NOT NULL 
            THEN 
                (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
            END) AS discount_price
        ")
        ->groupBy("books.id", "authors.id", "categories.id");

        if ($author) {
            $books = $books->having("books.author_id", "=", $author);
        } else if ($category) {
            $books = $books->having("books.category_id", "=", $category);
        } else if ($ratings) {
            $books = $books
            ->havingRaw("(SELECT avg (cast (reviews.rating_start as float))::numeric (10, 1) FROM reviews WHERE books.id = reviews.book_id) >= $ratings");
        }

        if ($sortCriteria === "onsale") {
            $books = $books->orderByRaw("
                books.book_price - (CASE WHEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
                IS NULL THEN books.book_price 
                WHEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
                IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
                END) DESC
            ");
        } else if ($sortCriteria === "popularity") {
            $books = $books->orderByRaw("
                (SELECT COUNT(reviews.id) FROM reviews WHERE reviews.book_id = books.id) DESC
            ");
        } else if ($sortCriteria === "priceasc") {
            $books = $books->orderByraw("
                (CASE WHEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
                IS NULL THEN books.book_price 
                WHEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
                IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
                END) ASC
            ");
        } else if ($sortCriteria === "pricedesc") {
            $books = $books->orderByRaw("
                (CASE WHEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
                IS NULL THEN books.book_price 
                WHEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
                IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
                END) DESC
            ");
        }

        $books = $books->paginate($pageSize);

        return response($books);
    }

    /**
     * Display a listing of reccomendation for the books
     *
     * @query: page, page-size, author, category, ratings, sort
     * @return \Illuminate\Http\Response
     */
    public function getBookRecTest(Request $request)
    {
        $books = DB::table("books")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->join("authors", "books.author_id", "=", "authors.id")
        ->join("categories", "books.category_id", "=", "categories.id")
        ->selectRaw("
            books.*,
            authors.id AS author_id, 
            authors.author_name AS author_name, 
            categories.id AS category_id, 
            (CASE 
            WHEN 
                (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) IS NULL 
            THEN 
                books.book_price 
            WHEN 
                (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) IS NOT NULL 
            THEN 
                (SELECT MIN(discounts.discount_price) 
                FROM discounts 
                WHERE discounts.book_id = books.id 
                AND discount_start_date <= CURRENT_DATE
                AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
            END) AS discount_price
        ")
        ->groupBy("books.id", "authors.id", "categories.id");

        $popularBooks = $books;
        $popularBooks = $popularBooks
        ->orderByRaw("
            (SELECT COUNT(reviews.id) FROM reviews WHERE reviews.book_id = books.id) DESC
        ")
        ->skip(0)
        ->take(8)
        ->get()
        ;

        $onSaleBooks = $books;
        $onSaleBooks = $onSaleBooks
        ->orderByRaw("
            books.book_price - (CASE WHEN (SELECT MIN(discounts.discount_price) 
            FROM discounts 
            WHERE discounts.book_id = books.id 
            AND discount_start_date <= CURRENT_DATE
            AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
            IS NULL THEN books.book_price 
            WHEN (SELECT MIN(discounts.discount_price) 
            FROM discounts 
            WHERE discounts.book_id = books.id 
            AND discount_start_date <= CURRENT_DATE
            AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE)) 
            IS NOT NULL THEN (SELECT MIN(discounts.discount_price) 
            FROM discounts 
            WHERE discounts.book_id = books.id 
            AND discount_start_date <= CURRENT_DATE
            AND (discount_end_date IS NULL OR discount_end_date >= CURRENT_DATE))
            END) DESC
        ")
        ->skip(0)
        ->take(10)
        ->get()
        ;

        $highlyRatedBooks = $books;
        $highlyRatedBooks = $highlyRatedBooks
        ->orderByRaw("
            (SELECT avg (cast (reviews.rating_start as float))::numeric (10, 1) FROM reviews WHERE books.id = reviews.book_id) DESC
        ")
        ->skip(0)
        ->take(8)
        ->get()
        ;
        
        return response([
            'popularBooks' => $popularBooks,
            'onSaleBooks' => $onSaleBooks,
            'highlyRatedBooks' => $highlyRatedBooks,
        ]);
    }

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
