<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $discounts = Discount::all();

        return response($discounts);
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
            'book_id' => 'required',
            'discount_start_date' => 'required|max:13|date',
            'discount_end_date' => 'required|max:13|date|after_or_equal:discount_start_date',
            'discount_price' => 'required|numeric',
        ]);

        $discount = new Discount();
        
        $discount->book_id = $request->book_id;
        $discount->discount_start_date = $request->discount_start_date;
        $discount->discount_end_date = $request->discount_end_date;
        $discount->discount_price = $request->discount_price;

        $discount->save();
        
        return response($discount);
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
        $discount = Discount::findOrFail($id);

        return response($discount);
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
        //
        $discount = Discount::findOrFail($id);

        $validated = $request->validate([
            'book_id' => 'required',
            'discount_start_date' => 'required|max:13|date',
            'discount_end_date' => 'required|max:13|date|after_or_equal:discount_start_date',
            'discount_price' => 'required',
        ]);

        $discount->book_id = $request->book_id;
        $discount->discount_start_date = $request->discount_start_date;
        $discount->discount_end_date = $request->discount_end_date;
        $discount->discount_price = $request->discount_price;

        $discount->save();

        return response($discount);
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
        $discount = Discount::findOrFail($id);

        $discount->delete();

        return response($discount);
    }
}
