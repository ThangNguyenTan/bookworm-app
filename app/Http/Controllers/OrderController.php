<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $orders = Order::with("OrderItems")->get();

        return response($orders);
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
            'order_amount' => 'required',
            "order_items"  => "required|array|min:1",
        ]);

        $orderItems = $request->order_items;

        // Check for the validity of all of the items in the cart
        foreach ($orderItems as $index => $orderItemNormal) {
            $bookID = $orderItemNormal['bookID'];
            $quantity = $orderItemNormal['quantity'];
            $price = $orderItemNormal['price'];

            if (!$bookID || !$quantity || !$price) {
                return response(collect([
                    "message" => "Lack of information for the order items"
                ]), 400);
            }

            $existedBook = Book::find($bookID);

            if (!$existedBook) {
                return response(collect([
                    "message" => "The book with an ID of $bookID does not exist",
                    "invalid_book_id" => $bookID
                ]), 404); 
            }
        }

        // Generate a new order
        $order = new Order();
        
        $order->order_amount = $request->order_amount;
        $order->order_date = date("Y-m-d H:i:s");

        $order->save();

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
        
        $order = Order::findOrFail($order->id);

        $order->OrderItems;

        return response($order);
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
        $order = Order::findOrFail($id);

        $order->OrderItems;

        foreach ($order->OrderItems as $index => $order_item) {
            $order_item->Book->Author;
        }

        return response($order);
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }
}
