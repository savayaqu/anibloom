<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index1() {
        $categories = Category::all();
        return response([
            'data' => $categories,
        ]);
    }
    public function index() {
        $categories = Category::all();
        return view('categories', ['categories' => $categories]);
    }
}
