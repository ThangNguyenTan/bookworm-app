<?php

namespace App\Http\Business;

use App\Models\Book;
use App\Models\OrderItem;
use Exception;
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

    public function validateOrderItems($orderItems) {
        // Check for the validity of all the items in the cart
        foreach ($orderItems as $orderItemNormal) {
            try {
                $bookID = $orderItemNormal['bookID'];
                $quantity = $orderItemNormal['quantity'];
                $price = $orderItemNormal['price'];
            } catch (Exception $e) {
                return response(collect([
                    "message" => $e->getMessage()
                ]), Response::HTTP_BAD_REQUEST);
            }

            $bookID = $orderItemNormal['bookID'];

            $existedBook = Book::find($bookID);

            if (!$existedBook) {
                return response(collect([
                    "message" => "The book with an ID of $bookID does not exist",
                    "invalid_book_id" => $bookID
                ]), Response::HTTP_NOT_FOUND); 
            }
        }
    }
}