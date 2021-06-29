<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function OrderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
