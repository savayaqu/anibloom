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
    //Просмотр всех товаров
Route::get('/products', [ProductController::class, 'index']);
    //Просмотр способов оплаты
Route::get('/payment', [OrderController::class, 'payment']);
    //Просмотр отзывов у товара
Route::get('/product/{id}/review', [ReviewController::class, 'index']);

//Функционал авторизированного пользователя
    //Выход
Route::middleware('auth:api')->get('/logout', [AuthController::class, 'logout']);
    //Просмотр своего профиля
Route::middleware('auth:api')->get('/profile', [UserController::class, 'this']);
    //Добавление товара в корзину
Route::middleware('auth:api')->post('/product/{id}', [CartController::class, 'addToCart']);
    //Просмотр своей корзины
Route::middleware('auth:api')->get('/cart', [CartController::class, 'index']);
    //Оформление заказа
Route::middleware('auth:api')->post('/checkout', [OrderController::class, 'checkout']);
    //Оставление отзыва для определённого товара
Route::middleware('auth:api')->post('/product/{id}/review', [ReviewController::class, 'store']);
    //Редактирование корзины
Route::middleware('auth:api')->patch('/cart', [CartController::class, 'update']);
   //Редактирование своего профиля
Route::middleware('auth:api')->patch('/profile', [UserController::class, 'updateProfile']);
   //Удаление товара из корзины
Route::middleware('auth:api')->delete('/cart/product/{id}', [CartController::class, 'delete']);
    //Просмотр заказов
Route::middleware('auth:api')->get('/orders', [OrderController::class, 'index']);
    //Просмотр купленных товаров
Route::middleware('auth:api')->get('/compound', [UserController::class, 'compound']);

//Функционал администратора
    //Создание категории
Route::middleware('auth:api' , 'role:2')->post('/admin/category/create', [AdminController::class, 'createCategory']);
    //Добавление товара
Route::middleware('auth:api' , 'role:2')->post('/admin/product/create', [AdminController::class, 'createProduct']);
    //Редактирование категории
Route::middleware('auth:api' , 'role:2')->patch('/admin/category/{id}/edit', [AdminController::class, 'updateCategory']);
    //Редактирование товара
Route::middleware('auth:api' , 'role:2')->post('/admin/product/{id}/edit', [AdminController::class, 'updateProduct']);
    //Удаление категории
Route::middleware('auth:api' , 'role:2')->delete('/admin/category/{id}/delete', [AdminController::class, 'deleteCategory']);
    //Удаление товара
Route::middleware('auth:api' , 'role:2')->delete('/admin/product/{id}/delete', [AdminController::class, 'deleteProduct']);






















