<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use App\Http\Requests\ReviewCreateRequest;
use App\Http\Requests\ReviewUpdateRequest;
use App\Models\Compound;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($productId)
    {
        // Получаем отзывы для указанного товара
        $reviews = Review::where('product_id', $productId)->get();

        // Проверяем, найдены ли отзывы
        if ($reviews->isEmpty()) {
            // Если отзывы не найдены, возвращаем сообщение об ошибке
            throw new ApiException(404, 'Отзывы не найдены для указанного товара');
        }

        // Возвращаем отзывы в формате JSON
        return response()->json($reviews);
    }
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
            throw new ApiException(404, 'Вы не можете оставить отзыв на товар, который вы не покупали');
        }

        // Проверяем, оставлял ли пользователь уже отзыв на данный товар
        $existingReview = Review::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->exists();

        // Если пользователь уже оставлял отзыв, возвращаем сообщение об ошибке
        if ($existingReview) {
            throw new ApiException(403, 'Вы уже оставили отзыв на этот товар');

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

}
