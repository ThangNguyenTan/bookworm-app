<?php

namespace App\Http\Controllers;

use App\Http\Business\OrderBusiness;
use App\Models\Book;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
        $orderBusiness = new OrderBusiness();

        $validated = $request->validate([
            'order_amount' => 'required',
            "order_items"  => "required|array|min:1",
        ]);

        $orderItems = $request->order_items;

        // Check for the validity of all the items in the cart
        $isOrderItemsNotValid = $orderBusiness->validateOrderItems($orderItems);
        if ($isOrderItemsNotValid) {
            return $isOrderItemsNotValid;
        }

        // Create new order
        $order = new Order();
        $order->order_amount = $request->order_amount;
        $order->order_date = date("Y-m-d H:i:s");
        $order->save();

        // Create records for valid order items 
        // and bind them with the new order
        $orderBusiness->createOrderItems($orderItems, $order);
        
        // Find them again and use relational 
        // query to extract the full data
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
