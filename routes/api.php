<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
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
Route::get('/user', [UserController::class, 'index']);



//Функционал пользователя
    //Регистрация
Route::post('/register' , [UserController::class, 'create' ]);
    //Авторизация
Route::post('/login' , [AuthController::class, 'login' ]);
    //Просмотр категорий товаров
Route::get('/categories' , [CategoryController::class, 'index']);
    //Просмотр товаров определенной категории
Route::get('/category{id}' , [ProductController::class, 'showMany']);
    //Просмотр конкретного товара
Route::get('/category/product{id}' , [ProductController::class, 'show']);



//Функционал авторизированного пользователя
    //Выход
Route::middleware('auth:api')->get ('/logout', [AuthController::class, 'logout']);
    //Просмотр своего профиля
Route::middleware('auth:api')->get ('/profile', [UserController::class, 'this']);
    //Добавление товара в корзину
Route::middleware('auth:api')->post('/category/product{id}', [ProductController::class, 'addToCart']);



















