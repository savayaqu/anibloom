<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function createCategory(CategoryCreateRequest $request)
    {
        // Проверяем, есть ли категория с таким именем уже в базе данных
        $existingCategory = Category::where('name', $request->input('name'))->first();
        if ($existingCategory) {
            return response()->json(['error' => 'Категория с таким именем уже существует'], 422);
        }

        // Создаем новую категорию
        $category = new Category([
            'name' => $request->input('name'),
        ]);

        // Сохраняем категорию в базе данных
        $category->save();

        // Возвращаем успешный ответ
        return response()->json(['message' => 'Категория успешно создана'], 201);
    }
    public function createProduct(ProductCreateRequest $request) {
        // Создаем новый продукт
        $product = new Product([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'quantity' => $request->input('quantity'),
            'photo' => $request->input('photo'),
            'category_id' => $request->input('name'),
        ]);
        //сохраняем в БД
        $product->save();
        // Возвращаем успешный ответ
        return response()->json(['message' => 'Продукт успешно создан'], 201);
    }
    public function allUsers()
    {
        $users = User::where('role_id', 1)->get();
        return response([
            'data' => $users,
        ]);
    }
    public function allReviews()
    {
        $reviews = Review::all();
        return response([
            'data' => $reviews,
        ]);
    }
    public function allOrders()
    {
        $orders = Order::all();
        return response([
            'data' => $orders,
        ]);
    }
    public function updateCategory(CategoryUpdateRequest $request, $id)
    {
        //Проверка существования
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['error' => 'Категория не найдена'], 404);
        }
        $category->name = $request->input('name');
        $category->save();
        return response()->json(['message' => 'Категория успешно обновлена'], 200);

    }
    public function updateProduct(ProductUpdateRequest $request, $id)
    {
        //Проверка существования
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Товар не найден'], 404);
        }
        // Заполнение модели данными из запроса
        $product->fill($request->only(['name', 'description', 'price', 'quantity', 'photo']));

        // Сохранение изменений
        $product->save();
        return response()->json(['message' => 'Товар успешно обновлен'], 200);

    }
}
