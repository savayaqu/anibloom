<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryCreateRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Requests\ReviewUpdateRequest;
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

    public function updateOrder(OrderUpdateRequest $request, $id)
    {
        //Проверка существования
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['error' => 'Статус заказа не найден'], 404);
        }
        // Заполнение модели данными из запроса
        $order->fill($request->only(['address', 'payment_id', 'status_id']));

        // Сохранение изменений
        $order->save();
        return response()->json(['message' => 'Статус заказа успешно обновлен'], 200);

    }

    public function updateReview(ReviewUpdateRequest $request, $id)
    {
        //Проверка существования
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['error' => 'Отзыв не найден'], 404);
        }
        // Заполнение модели данными из запроса
        $review->fill($request->only(['rating', 'textReview']));

        // Сохранение изменений
        $review->save();
        return response()->json(['message' => 'Отзыв успешно обновлен'], 200);

    }
    // Удаление категории
    public function deleteCategory($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }

    // Удаление товара
    public function deleteProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    // Удаление пользователя
    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    // Удаление отзыва
    public function deleteReview($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully'], 200);
    }



}
