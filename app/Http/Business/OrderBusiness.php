<?php

namespace App\Http\Business;

use App\Models\Book;
use App\Models\OrderItem;
use \Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class OrderBusiness
{
    public function createOrderItems($orderItems, $order) {
        // Perform a loop to add all of the valid cart items into the created order
        foreach ($orderItems as $index => $orderItemNormal) {
            $orderItem = new OrderItem();

            $bookID = $orderItemNormal['bookID'];
            $orderID = $order->id;
            $quantity = $orderItemNormal['quantity'];
            $price = $orderItemNormal['price'];

            $orderItem->book_id = $bookID;
            $orderItem->order_id = $orderID;
            $orderItem->quantity = $quantity;
            $orderItem->price = $price;

            $orderItem->save();
        }
    }
}