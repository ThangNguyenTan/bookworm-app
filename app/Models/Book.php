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

}
