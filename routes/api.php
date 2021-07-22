<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\MainController;
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

Route::get("main/filters", [MainController::class, "getShopFilters"]);

Route::apiResource("authors", AuthorController::class);

Route::apiResource("categories", CategoryController::class);

Route::get("books/rec", [BookController::class, 'getBookRec']);
Route::apiResource("books", BookController::class);

Route::post("books/{id}/discount", [DiscountController::class, "store"]);

Route::get("books/{id}/reviews", [ReviewController::class, 'index']);
Route::post("books/{id}/reviews", [ReviewController::class, 'store']);
Route::apiResource("reviews", ReviewController::class, [
    'only' => ['show', 'update', 'destroy']
]);

Route::apiResource("orders", OrderController::class);

