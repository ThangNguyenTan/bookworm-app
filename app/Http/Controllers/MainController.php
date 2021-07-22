<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Category;
use Illuminate\Http\Request;

class MainController extends Controller
{

    public function getShopFilters()
    {
        $authors = Author::all("id", "author_name");
        $categories = Category::all("id", "category_name");

        return response(compact("authors", "categories"));
    }

}
