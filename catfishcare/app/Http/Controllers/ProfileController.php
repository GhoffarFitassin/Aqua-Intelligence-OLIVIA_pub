<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Return the authenticated user's data as JSON.
     */
    public function show(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    /**
     * Update the authenticated user's profile via API.
     */
    public function updateApi(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => ['sometimes', 'string', 'max:255'],
            'jabatan'  => ['sometimes', 'string', 'max:255'],
        ]);

        $request->user()->fill($validated);
        $request->user()->save();

        return response()->json($request->user());
    }
}
