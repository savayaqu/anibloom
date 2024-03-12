<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AdminController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


    //Регистрация
Route::post('/register' , [UserController::class, 'create' ]);
    //Авторизация
Route::post('/login' , [AuthController::class, 'login' ]);
    //Просмотр категорий товаров
Route::get('/categories' , [CategoryController::class, 'index']);
    //Просмотр товаров определенной категории
Route::get('/category/{id}' , [ProductController::class, 'showMany']);
    //Просмотр конкретного товара
Route::get('/product/{id}' , [ProductController::class, 'show']);
    //Просмотр способов оплаты
Route::get('/payment', [OrderController::class, 'payment']);


//Функционал авторизированного пользователя
    //Выход
Route::middleware('auth:api')->get ('/logout', [AuthController::class, 'logout']);
    //Просмотр своего профиля
Route::middleware('auth:api')->get ('/profile', [UserController::class, 'this']);
    //Добавление товара в корзину
Route::middleware('auth:api')->post('/product/{id}', [CartController::class, 'addToCart']);
    //Просмотр своей корзины
Route::middleware('auth:api')->get('/cart', [CartController::class, 'index']);
    //Оформление заказа
Route::middleware('auth:api')->post('/checkout', [OrderController::class, 'checkout']);
    //Оставление отзыва для определнного товара
Route::middleware('auth:api')->post('/product/{id}/review', [ReviewController::class, 'store']);
    //Редактирование корзины
Route::middleware('auth:api')->patch('/cart', [CartController::class, 'update']);
    //Редактирование отзыва
Route::middleware('auth:api')->patch('/product/{id}/review', [ReviewController::class, 'update']);
    //Редактирование своего профиля
Route::middleware('auth:api')->patch('/profile', [UserController::class, 'updateProfile']);
    //Удаление отзыва
Route::middleware('auth:api')->delete('/product/{id}/review', [ReviewController::class, 'delete']);
    //Удаление товара из корзины
Route::middleware('auth:api')->delete('/cart/product/{id}', [CartController::class, 'delete']);



//Функционал администратора
    //Создание категории
Route::middleware('auth:api' , 'role:2')->post('/admin/category/create', [AdminController::class, 'createCategory']);
    //Добавление товара
Route::middleware('auth:api' , 'role:2')->post('/admin/product/create', [AdminController::class, 'createProduct']);
    //Просмотр всех пользователей
Route::middleware('auth:api' , 'role:2')->get('/admin/users', [AdminController::class, 'allUsers']);
    //Просмотр всех отзывов
Route::middleware('auth:api' , 'role:2')->get('/admin/reviews', [AdminController::class, 'allReviews']);
    //Просмотр всех заказов
Route::middleware('auth:api' , 'role:2')->get('/admin/orders', [AdminController::class, 'allOrders']);
    //Редактирование категории
Route::middleware('auth:api' , 'role:2')->patch('/admin/category/{id}/edit', [AdminController::class, 'updateCategory']);
    //Редактирование товара
Route::middleware('auth:api' , 'role:2')->post('/admin/product/{id}/edit', [AdminController::class, 'updateProduct']);
    //Изменение статуса заказа
Route::middleware('auth:api' , 'role:2')->patch('/admin/order/{id}/edit', [AdminController::class, 'updateOrder']);
    //Редактирование отзыва
Route::middleware('auth:api' , 'role:2')->patch('/admin/review/{id}/edit', [AdminController::class, 'updateReview']);
    //Удаление категории
Route::middleware('auth:api' , 'role:2')->delete('/admin/category/{id}/delete', [AdminController::class, 'deleteCategory']);
    //Удаление товара
Route::middleware('auth:api' , 'role:2')->delete('/admin/product/{id}/delete', [AdminController::class, 'deleteProduct']);
    //Удаление пользователя
Route::middleware('auth:api' , 'role:2')->delete('/admin/user/{id}/delete', [AdminController::class, 'deleteUser']);
    //Удаление отзыва
Route::middleware('auth:api' , 'role:2')->delete('/admin/review/{id}/delete', [AdminController::class, 'deleteReview']);






















