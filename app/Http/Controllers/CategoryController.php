<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::all();
        if($categories->isEmpty()) {
            throw new ApiException(404, 'Категории не найдены');
        } else {
            return response([
                'data' => $categories,
            ]);
        }
    }

}
