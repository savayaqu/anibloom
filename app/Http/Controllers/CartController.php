<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
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
            throw new ApiException(404, 'Товар не найден в вашей корзине');
        }

        // Проверяем, чтобы новое количество было положительным числом
        if ($newQuantity > 0) {
            // Обновляем количество товара
            $cartItem->quantity = $newQuantity;
            $cartItem->save();

            // Возвращаем ответ с сообщением об успешном обновлении корзины
            return response()->json(['message' => 'Количество товара в корзине успешно обновлено'], 200);
        } else {
            throw new ApiException(400, 'Количество товара должно быть положительным числом');
        }
    }


    public function addToCart(Request $request, $id) {
        $product = Product::find($id);
        // Проверка на существование товара
        if(!$product) {
            throw new ApiException(404, 'Товар не найден');
        }

        // Получение доступного количества товара из базы данных
        $availableQuantity = $product->quantity;

        // Получение количества товара из запроса (добавляем значение по умолчанию = 1)
        $quantity = $request->input('quantity', 1);

        // Проверка, что количество товара больше 0
        if ($quantity <= 0) {
            return response()->json(['error' => 'Количество товара должно быть больше 0'], 400);
        }

        // Проверка, что запрошенное количество товара не превышает доступное количество
        if ($quantity > $availableQuantity) {
            return response()->json(['error' => 'Недостаточное количество товара в наличии'], 400);
        }

        // Получение текущего пользователя
        $user = auth()->user();

        // Проверка существует ли пользователь
        if (!$user) {
            return response()->json(['error' => 'Пользователь не авторизирован'], 401);
        }

        // Создание нового элемента корзины и связывание с пользователем
        $cartItem = new Cart([
            'quantity' => $quantity,
            'price' => $product->price * $quantity,
            'product_id' => $product->id,
        ]);
        $user->cart()->save($cartItem);

        return response()->json(['message' => 'Продукт добавлен в корзину']);
    }

}
