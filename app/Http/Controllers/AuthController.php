<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $user = User
            ::where('login',    $request->login)
            ->where('password', $request->password)
            ->first();

        if (!$user) throw new ApiException(401, 'Ошибка аутентификации');

        $newToken = Hash::make(microtime(true) * 1000);

        $user->api_token = $newToken;
        $user->save();

        return response()->json([
            'data' => [
                'user_token' => $user->api_token,
            ],
        ]);
    }
    public function logout(Request $request) {
        $user = $request->user();
        if (!$user) throw new ApiException(401, 'Ошибка аутентификации');
        $user->api_token = null;
        $user->save();
        return response([
            'data' => [
                'message' => 'Вы успешно вышли из системы',
            ],
        ]);
    }
}
