<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(UserCreateRequest $request) {
        $user = new User($request->all());
        $user->save();
        return response([
            'data' => [
                'id' => $user->id,
                'status' => 'created',
            ],
        ], 201);
    }
    public function this() {
        $user = auth()->user();

        return response()->json([
            'data' => $user
        ]);
    }
    public function show(int $id) {
        $user = User::find($id);
        if(!$user) throw new ApiException(404, 'User not found');
        return response([
            'data' => $user,
        ]);
    }
    public function updateProfile(UserUpdateRequest $request) {
        // Получаем текущего аутентифицированного пользователя
        $user = auth()->user();

        // Проверяем, были ли переданы данные для обновления каждого поля
        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('surname')) {
            $user->surname = $request->input('surname');
        }

        if ($request->filled('patronymic')) {
            $user->patronymic = $request->input('patronymic');
        }

        if ($request->filled('login')) {
            $user->login = $request->input('login');
        }

        if ($request->filled('birth')) {
            $user->birth = $request->input('birth');
        }

        if ($request->filled('email')) {
            $user->email = $request->input('email');
        }

        if ($request->filled('telephone')) {
            $user->telephone = $request->input('telephone');
        }

        // Сохраняем обновленные данные профиля пользователя
        $user->save();

        return response()->json(['message' => 'Профиль пользователя успешно обновлен'], 200);
    }

}
