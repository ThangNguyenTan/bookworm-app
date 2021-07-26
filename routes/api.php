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

// Main Route
Route::get("main/filters", [MainController::class, "getShopFilters"]);

// Main Route
Route::apiResource("authors", AuthorController::class);

// Main Route
Route::apiResource("categories", CategoryController::class);

// Main Route
Route::get("books/recommended", [BookController::class, 'getBookRec']);
Route::apiResource("books", BookController::class);

// Main Route
Route::post("books/{id}/discount", [DiscountController::class, "store"]);

// Books Reviews Route
Route::get("books/{id}/reviews", [ReviewController::class, 'index']);
Route::post("books/{id}/reviews", [ReviewController::class, 'store']);
Route::apiResource("reviews", ReviewController::class, [
    'only' => ['show', 'update', 'destroy']
]);

// Main Route
Route::apiResource("orders", OrderController::class);

