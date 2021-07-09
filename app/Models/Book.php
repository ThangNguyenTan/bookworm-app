<?php

namespace App\Models;

use App\Http\Utils\Utilities;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    public function Author()
    {
        return $this->belongsTo(Author::class);
    }

    public function Category()
    {
        return $this->belongsTo(Category::class);
    }

    public function Discounts()
    {
        return $this->hasMany(Discount::class);
    }

    public function BestDiscount() {
        return $this->hasOne(Discount::class)
        ->orderBy('discount_price', 'asc');
    }

    public function OrderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function Reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function fetchRequiredFieldsForShop() {
        $utils = new Utilities();

        $books = DB::table("books")
        ->leftjoin("discounts", "books.id", "=", "discounts.book_id")
        ->join("authors", "books.author_id", "=", "authors.id")
        ->join("categories", "books.category_id", "=", "categories.id")
        ->selectRaw("
            books.*,
            authors.id AS author_id, 
            authors.author_name AS author_name, 
            categories.id AS category_id, 
            $utils->min_discount_price_query_coalesce AS discount_price
        ")
        ->groupBy("books.id", "authors.id", "categories.id");

        return $books;
    }
}
