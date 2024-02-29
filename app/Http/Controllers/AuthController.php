<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login1(LoginRequest $request) {
        $user = User
            ::where('login',    $request->login)
            ->where('password', $request->password)
            ->first();

        if (!$user) return response('Authentication failed', 401);

        $newToken = Hash::make(microtime(true) * 1000);

        $user->api_token = $newToken;
        $user->save();

        return response([
            'data' => [
                'user_token' => $user->api_token,
            ],
        ]);
    }
    public function login(LoginRequest $request) {
        $user = User
            ::where('login',    $request->login)
            ->where('password', $request->password)
            ->first();

        if (!$user)  return redirect('/api/login')->with('error', 'Неверные учетные данные');


        $newToken = Hash::make(microtime(true) * 1000);

        $user->api_token = $newToken;
        $user->save();

        return redirect('/api/categories');
    }
    public function logout(Request $request) {
        $user = $request->user();
        if (!$user) return response('No authenticate', 403);
        $user->api_token = null;
        $user->save();
        return response([
            'data' => [
                'message' => 'logout',
            ],
        ]);
    }
}
