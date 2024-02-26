<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function showMany(int $id) {
        $product = Product::where('category_id', $id)->get();
        if(!$product) throw new ApiException(404, 'Товары не найдены');
        return response([
           'data' => $product
        ]);
    }
    public function show(int $id) {
        $product = Product::where('id', $id)->first();
        if(!$product) throw new ApiException(404, 'Товар не найден');
        return response([
            'data' => $product
        ]);
    }

}
