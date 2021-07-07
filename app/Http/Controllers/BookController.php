<?php

namespace App\Http\Controllers;

use App\Http\Utils\CustomPagination;
use App\Http\Utils\Filterer;
use App\Http\Utils\Calculation;
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
    public function index()
    {
        //
        //$books = Book::all();
        $books = Book::with('Author', 'Category', "Discounts", "Reviews")->get();

        return response($books);
    }

    /**
     * Display a listing of reccomendation for the books
     *
     * @query: page, page-size, author, category, ratings, sort
     * @return \Illuminate\Http\Response
     */
    public function getBookRec(Request $request)
    {
        $customPagination = new CustomPagination();
        $filterer = new Filterer();
        $calculator = new Calculation();
        $sorter = new Sorter();

        $currentPage = intval($request->input('page')) ?: 1;
        $pageSize = intval($request->input('page-size')) ?: 15;
        $author = $request->input('author') ?: false;
        $category = $request->input('category') ?: false;
        $ratings = $request->input('ratings') ?: false;
        $sortCriteria = $request->input('sort') ?: false;

        $books = Book::with('Author', 'Category', "Discounts", "Reviews")->get()->toArray();

        $searchCriteria = [
            'author' => $author,
            'category' => $category,
            'ratings' => $ratings
        ];
        $books = $filterer->filterBooks($books, $searchCriteria);

        $books = $calculator->calculateFinalPriceForBooks($books);

        $books = $sorter->sortBooks($books, $sortCriteria);

        $pageObject = $customPagination->paginate(count($books), $currentPage, $pageSize);
        
        var_dump(intval($pageObject->startIndex));
        var_dump(intval($pageObject->endIndex));

        $books = array_slice($books, intval($pageObject->startIndex), intval($pageObject->pageSize), true);

        return response([
            "data" => $books,
            "total" => count($books),
            "pageObject" => $pageObject
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
