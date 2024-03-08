<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewCreateRequest;
use App\Http\Requests\ReviewUpdateRequest;
use App\Models\Compound;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(ReviewCreateRequest $request, $productId)
    {
        // Получение текущего пользователя
        $user = auth()->user();

        // Проверка, есть ли у пользователя заказы, в которых есть указанный товар
        $order = Order::where('user_id', $user->id)
            ->whereHas('compound', function ($query) use ($productId) {
                $query->where('product_id', $productId);
            })
            ->first();

        // Если заказ не найден, возвращаем сообщение об ошибке
        if (!$order) {
            return response()->json(['error' => 'Вы не можете оставить отзыв на товар, который вы не покупали'], 403);
        }

        // Проверяем, оставлял ли пользователь уже отзыв на данный товар
        $existingReview = Review::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->exists();

        // Если пользователь уже оставлял отзыв, возвращаем сообщение об ошибке
        if ($existingReview) {
            return response()->json(['error' => 'Вы уже оставили отзыв на этот товар'], 403);
        }

        // Сохранение нового отзыва
        $review = new Review([
            'rating' => $request->input('rating'),
            'textReview' => $request->input('textReview'),
            'user_id' => $user->id,
            'product_id' => $productId,
        ]);
        $review->save();

        // Возвращаем сообщение об успешном сохранении отзыва
        return response()->json(['message' => 'Отзыв успешно сохранен'], 200);
    }

    public  function update(ReviewUpdateRequest $request, $productId)
    {
        // Получаем текущего пользователя
        $user = auth()->user();



        // Находим отзыв по id и проверяем, принадлежит ли он текущему пользователю
        $review = Review::where('product_id', $productId)
            ->where('user_id', $user->id)
            ->first();

        // Проверяем, найден ли отзыв и принадлежит ли он текущему пользователю
        if (!$review) {
            return response()->json(['error' => 'Отзыв не найден или не принадлежит вам'], 404);
        }

        // Проверяем, чтобы пользователь не пытался изменить отзыв для другого товара
        if ($review->product_id != $productId) {
            return response()->json(['error' => 'Отзыв принадлежит другому товару'], 403);
        }

        // Обновляем данные отзыва
        $review->rating = $request->input('rating');
        $review->textReview = $request->input('textReview');
        $review->save();

        // Возвращаем ответ с сообщением об успешном обновлении отзыва
        return response()->json(['message' => 'Отзыв успешно обновлен'], 200);
    }
    public function delete(Request $request, $productId)
    {
        // Получаем текущего пользователя
        $user = auth()->user();

        // Находим отзыв, который хочет удалить пользователь
        $review = Review::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        // Проверяем, был ли найден отзыв
        if (!$review) {
            return response()->json(['error' => 'Отзыв не найден'], 404);
        }

        // Удаляем отзыв
        $review->delete();

        // Возвращаем сообщение об успешном удалении отзыва
        return response()->json(['message' => 'Отзыв успешно удален'], 200);
    }
}
