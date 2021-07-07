<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Models\Discount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::get("/authors", [AuthorController::class, "index"]);
Route::get("/authors/authorID/{id}", [AuthorController::class, "show"]);
Route::post("/authors/add", [AuthorController::class, "store"]);
Route::put("/authors/edit/{id}", [AuthorController::class, "update"]);
Route::delete("/authors/delete/{id}", [AuthorController::class, "destroy"]);
*/

Route::apiResource("authors", AuthorController::class);

/*
Route::get("/categories", [CategoryController::class, "index"]);
Route::get("/categories/categoryID/{id}", [CategoryController::class, "show"]);
Route::post("/categories/add", [CategoryController::class, "store"]);
Route::put("/categories/edit/{id}", [CategoryController::class, "update"]);
Route::delete("/categories/delete/{id}", [CategoryController::class, "destroy"]);
*/

Route::apiResource("categories", CategoryController::class);

/*
Route::get("/books", [BookController::class, "index"]);
Route::get("/books/bookID/{id}", [BookController::class, "show"]);
Route::post("/books/add", [BookController::class, "store"]);
Route::put("/books/edit/{id}", [BookController::class, "update"]);
Route::delete("/books/delete/{id}", [BookController::class, "destroy"]);
*/

Route::get("books/test", [BookController::class, 'getBookRec']);
Route::apiResource("books", BookController::class);

/*
Route::get("/discounts", [DiscountController::class, "index"]);
Route::get("/discounts/discountID/{id}", [DiscountController::class, "show"]);
Route::post("/discounts/add", [DiscountController::class, "store"]);
Route::put("/discounts/edit/{id}", [DiscountController::class, "update"]);
Route::delete("/discounts/delete/{id}", [DiscountController::class, "destroy"]);
*/

Route::post("discounts/{id}/book", [DiscountController::class, "store"]);

/*
Route::get("/reviews", [ReviewController::class, "index"]);
Route::get("/reviews/reviewID/{id}", [ReviewController::class, "show"]);
Route::get("/reviews/bookID/{bookID}", [ReviewController::class, "getReviewsByBookID"]);
Route::post("/reviews/add", [ReviewController::class, "store"]);
Route::put("/reviews/edit/{id}", [ReviewController::class, "update"]);
Route::delete("/reviews/delete/{id}", [ReviewController::class, "destroy"]);
*/

Route::get("/reviews/{id}/book", [ReviewController::class, "index"]);
Route::post("/reviews/{id}/book", [ReviewController::class, "store"]);
Route::put("/reviews/{id}", [ReviewController::class, "update"]);
Route::delete("/reviews/{id}", [ReviewController::class, "destroy"]);

/*
Route::get("/orders", [OrderController::class, "index"]);
Route::get("/orders/orderID/{id}", [OrderController::class, "show"]);
Route::post("/orders/add", [OrderController::class, "store"]);
//Route::put("/orders/edit/{id}", [OrderController::class, "update"]);
Route::delete("/orders/delete/{id}", [OrderController::class, "destroy"]);
*/

Route::apiResource("orders", OrderController::class);

