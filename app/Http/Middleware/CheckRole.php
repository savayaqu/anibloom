<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (Auth::check() && Auth::user()->hasRole($roles)) {
            return $next($request);
        }

        return response()->json(['error' => 'У вас нет прав'], 403);
    }
}
