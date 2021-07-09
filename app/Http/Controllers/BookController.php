<?php

namespace App\Http\Controllers;

use App\Http\Utils\Filterer;
use App\Http\Utils\Sorter;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filterer = new Filterer();
        $sorter = new Sorter();

        // Extracting search query
        $pageSize = intval($request->input('page-size')) ?: 15;
        $author = $request->input('author') ?: false;
        $category = $request->input('category') ?: false;
        $ratings = $request->input('ratings') ?: false;
        $sortCriteria = $request->input('sort') ?: false;

        $books = new Book();
        $books = $books->fetchRequiredFieldsForShop();

        $searchCriteria = [
            'author' => $author,
            'category' => $category,
            'ratings' => $ratings
        ];

        // Append having query to the book model
        $books = $filterer->filterBooksQuery($books, $searchCriteria);
        
        // Append order by query to the book model
        $books = $sorter->sortBooksQuery($books, $sortCriteria);

        // Create pagination for the filtered and sorted books
        $books = $books->paginate($pageSize);

        return response($books);
    }

    /**
     * Display a listing of recommendation for the books
     *
     * @query: page, page-size, author, category, ratings, sort
     * @return \Illuminate\Http\Response
     */
    public function getBookRec(Request $request)
    {
        $sorter = new Sorter();

        $books = new Book();

        // Filter the books by popularity
        // i.e. number of reviews. 
        // The more the reviews the higher the rakings
        $popularBooks = $books->fetchRequiredFieldsForShop();
        $popularBooks = $sorter->sortBooksQuery($popularBooks, "popularity");
        $popularBooks = $popularBooks
        ->skip(0)
        ->take(8)
        ->get()
        ;

        // Filter the books by on sale
        // i.e. the difference between book price and discount price. 
        // The higher the difference the higher the rakings
        $onSaleBooks = $books->fetchRequiredFieldsForShop();
        $onSaleBooks = $sorter->sortBooksQuery($onSaleBooks, "onsale");
        $onSaleBooks = $onSaleBooks
        ->skip(0)
        ->take(10)
        ->get()
        ;

        // Filter the books by avg ratings
        // The higher the ratings the higher the rakings
        $highlyRatedBooks = $books->fetchRequiredFieldsForShop();
        $highlyRatedBooks = $highlyRatedBooks
        ->orderByRaw("
            (SELECT avg (CAST (reviews.rating_start AS float))::numeric (10, 1) FROM reviews WHERE books.id = reviews.book_id) DESC
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
        $books = new Book();
        $books = $books->fetchRequiredFieldsForShop();
        $books = $books
        ->where('books.id', '=', $id)
        ->get();

        return response($books);
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
