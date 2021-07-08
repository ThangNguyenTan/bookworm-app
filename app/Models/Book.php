<?php

namespace App\Models;

use App\Http\Utils\Calculation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['ratings', 'discount_price'];

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

    public function getRatingsAttribute() {
        $calculator = new Calculation();
        $reviews = $this->Reviews;
        $ratings = $calculator->calculateRatings($reviews);
        return $ratings;
    }

    public function getDiscountPriceAttribute() {
        return $this->BestDiscount ? 
        $this->BestDiscount->discount_price : 
        $this->book_price;
    }
}
