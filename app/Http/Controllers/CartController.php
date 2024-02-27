<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        // Получение текущего пользователя
        $user = auth()->user();

        // Получаем корзину текущего пользователя
        $cartItems = $user->cart;

        // Возвращаем представление с содержимым корзины
        return response()->json(['cart_items' => $cartItems]);
    }

    public function update(Request $request)
    {
        // Получаем текущего пользователя
        $user = auth()->user();

        // Получаем product_id и новое количество товара из запроса
        $productId = $request->input('product_id');
        $newQuantity = $request->input('quantity');

        // Находим товар в корзине текущего пользователя по product_id
        $cartItem = Cart::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        // Проверяем, найден ли товар в корзине
        if (!$cartItem) {
            return response()->json(['error' => 'Товар не найден в вашей корзине'], 404);
        }

        // Проверяем, чтобы новое количество было положительным числом
        if ($newQuantity > 0) {
            // Обновляем количество товара
            $cartItem->quantity = $newQuantity;
            $cartItem->save();

            // Возвращаем ответ с сообщением об успешном обновлении корзины
            return response()->json(['message' => 'Количество товара в корзине успешно обновлено'], 200);
        } else {
            return response()->json(['error' => 'Количество товара должно быть положительным числом'], 400);
        }
    }


    public function addToCart(Request $request, $id) {
        $product = Product::where('id', $id)->first();
        //проверка на существование товара
        if(!$product) {
            return response()->json(['error' => 'Продукт не найден'], 404);
        }
        //получаем текущего пользователя
        $user = auth()->user();

        //проверка существует ли пользователь
        if (!$user) {
            return response()->json(['error' => 'Пользователь не авторизирован'], 401);
        }
        // Получаем количество товара из запроса (добавляем еще значения по умолчанию = 1)
        $quantity = $request->input('quantity', 1);

        // Проверяем, что количество товара больше 0
        if ($quantity <= 0) {
            return response()->json(['error' => 'Количество товара должно быть больше 0'], 400);
        }

        $cartItem = new Cart([
            'quantity' => $quantity,
            'price' => $product->price * $quantity,
            'product_id' => $product->id,
        ]);
        //связываем товар с пользователем и сохраняем в БД
        $user->cart()->save($cartItem);

        return response()->json(['message' => 'Продукт добавлен в корзинку']);
    }
}
