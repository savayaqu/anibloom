<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return response([
            'data' => $users,
        ]);
    }

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
}
