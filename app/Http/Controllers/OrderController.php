<?php

namespace App\Http\Controllers;

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
        $orders = Order::all();

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
            'order_amount' => 'required|numeric',
            "order_items"    => "required|array|min:1",
        ]);

        $order = new Order();
        
        $order->order_amount = $request->order_amount;
        $order->order_date = date("Y-m-d H:i:s");

        $order->save();

        $orderItems = $request->order_items;

        foreach ($orderItems as $index => $orderItemNormal) {
            $orderItem = new OrderItem();

            //return dd($orderItemNormal['bookID']);

            $bookID = $orderItemNormal['bookID'];
            $orderID = $order->id;
            $quantity = $orderItemNormal['quantity'];
            $price = $orderItemNormal['price'];;

            if (!$bookID || !$orderID || !$quantity || !$price) {
                return response(collect([
                    "message" => "Lack of information for the order items"
                ]), 400);
            }

            $orderItem->book_id = $bookID;
            $orderItem->order_id = $orderID;
            $orderItem->quantity = $quantity;
            $orderItem->price = $price;

            $orderItem->save();
        }
        
        $order = Order::findOrFail($order->id);

        $order->orderItems = $order->OrderItems;

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

        $order->orderItems = $order->OrderItems;

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
        /*
        $author = Author::findOrFail($id);

        $validated = $request->validate([
            'author_name' => 'required|max:255',
        ]);

        $author->author_name = $request->author_name;
        $author->author_bio = $request->author_bio;

        $author->save();

        return response($author);
        */
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $order = Order::findOrFail($id);

        $order->delete();

        return response($order);
    }
}
