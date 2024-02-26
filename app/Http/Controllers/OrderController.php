<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderCreateRequest;
use App\Models\Cart;
use App\Models\Compound;
use App\Models\Order;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function checkout(OrderCreateRequest $request) {
        //получаем текущее время
        $currentDateTime = Carbon::now()->format('Y-m-d H:i:s');
        //получаем данные пользователя
        $user = Auth::user();
        $address = $request->input('address');
        $paymentId = $request->input('payment_id');
        //создание заказа
        $order = new Order([
            'address' => $address,
            'dateOrder' => $currentDateTime,
            'payment_id' => $paymentId,
            'user_id' => $user->id,
        ]);
        $order->save();
        //добавление товара из корзины в заказ
        $cartItems = Cart::where('user_id', $user->id)->get(); // Получаем все товары из корзины
        foreach ($cartItems as $cartItem) {
            $compound = new Compound([
               'order_id'=> $order->id,
               'product_id' => $cartItem->product_id,
               'quantity' => $cartItem->quantity,
                'total' => $cartItem->price
            ]);
            $compound->save();
            $cartItem->delete();
        }
        // Возвращаем ответ с сообщением об успешном оформлении заказа
        return response()->json(['message' => 'Заказ успешно создан'], 200);
    }
}
