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
            'message' => 'Регистрация прошла успешно'
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
        if(!$user) throw new ApiException(404, 'Пользователь не найден');
        return response([
            'data' => $user,
        ]);
    }

}
