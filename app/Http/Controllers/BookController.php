<?php

namespace App\Http\Controllers;

use App\Http\Business\BookBusiness;
use App\Http\Utils\Filterer;
use App\Http\Utils\Sorter;
use App\Http\Utils\Utilities;
use App\Models\Book;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @query: page, page-size, author, category, ratings, sort
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filterer = new Filterer();
        $sorter = new Sorter();

        // Extracting search query
        $pageSize = intval($request->input('page-size')) ?: 15;
        $author = $request->input('author');
        $category = $request->input('category');
        $ratings = $request->input('ratings');
        $sortCriteria = $request->input('sort') ?: "popularity";

        $bookBusiness = new BookBusiness();

        $books = $bookBusiness->fetchRequiredFieldsForShop();

        // Conditionally inner join the discounts
        // since onsale books are the books 
        // which have more than 1 available discounts
        if ($sortCriteria === "onsale") {
            $books = $bookBusiness->fetchRequiredFieldsOfOnSaleBooks();
        }

        $searchCriteria = [
            'author' => $author,
            'category' => $category,
            'ratings' => $ratings
        ];

        // Append having query to the book model
        $books = $filterer->filterBooksQuery($books, $searchCriteria);
        
        // Append order by query to the book model
        $books = $sorter->sortBooksQuery($books, $sortCriteria);

        // Conditionally append having to the current books
        if ($sortCriteria === "onsale") {
            $books = $bookBusiness->appendHavingToOnSaleBooks($books);
        }

        // Create pagination for the filtered and sorted books
        $books = $books->paginate($pageSize);

        return response($books);
    }

    /**
     * Display a listing of recommendation for the books
     *
     * @return \Illuminate\Http\Response
     */
    public function getBookRec(Request $request)
    {
        $bookBusiness = new BookBusiness();

        // Get on sale books
        $onSaleBooks = $bookBusiness->getOnSaleBooks(10);

        // Get popular books
        $popularBooks = $bookBusiness->getPopularBooks(8);

        // Get highly rated books
        $highlyRatedBooks = $bookBusiness->getHighlyRatedBooks(8);

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
        $bookBusiness = new BookBusiness();
        $books = $bookBusiness->fetchRequiredFieldsForShop();
        $books = $books
        ->where('books.id', '=', $id)
        ->get();

        if (count($books) === 0) {
            return response(collect([
                "message" => "Record with this ID does not exist"
            ]), Response::HTTP_NOT_FOUND);
        }

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
