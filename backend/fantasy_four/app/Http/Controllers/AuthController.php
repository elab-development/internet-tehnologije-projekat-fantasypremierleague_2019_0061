<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'User registered successfully'
    ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return Response::json(['message' => 'Login successful'], 200);
        }

        return Response::json(['message' => 'Invalid login credentials'], 401);
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            Auth::logout();
            return Response::json(['message' => 'Successfully logged out'], 200);
        }

        return Response::json(['message' => 'User not authenticated'], 401);
    }
}
