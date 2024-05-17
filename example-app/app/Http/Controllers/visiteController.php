<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Visite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class visiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visits = Visite::query()
            ->where('userId', request()->user()->id)
            ->orderBy('visit_day')
            ->get();

        return response()->json(['visite' => $visits]);
    }


    public function searchVisits(Request $request)
    {
        try {
            $user = $request->user();
            $name = $request->input('name');
            $email = $request->input('email');
            $visitDay = $request->input('visit_day');

            $visits = Visite::query()
                ->where('userId', $user->id);

            if ($name) {
                $visits->whereHas('user', function ($query) use ($name) {
                    $query->where('name', 'like', '%' . $name . '%');
                });
            }

            if ($email) {
                $visits->whereHas('user', function ($query) use ($email) {
                    $query->where('email', 'like', '%' . $email . '%');
                });
            }

            if ($visitDay) {
                $visits->where('visit_day', $visitDay);
            }

            $visits = $visits->orderBy('visit_day')
                ->get();

            if ($visits->isEmpty()) {
                return response()->json(['message' => 'Nessuna visita trovata per i criteri di ricerca forniti.'], 404);
            }

            return response()->json(['visite' => $visits]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Si è verificato un errore durante la ricerca delle visite.'], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'email' => ['required', 'integer'],
            'description' => ['required', 'string'],
            'visit_day' => ['required', 'date'],
            'priority' => ['required', 'string'],
            'tel' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['userId'] = $request->user()->id;
        $visite = Visite::create($data);

        return response()->json(['message' => 'Visita creata', 'visita' => $visite], 201);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Visite $visite)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'email' => ['required', 'integer'],
            'description' => ['required', 'string'],
            'visit_day' => ['required', 'date'],
            'priority' => ['required', 'string'],
            'tel' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $visite->update($data);

        return response()->json(['message' => 'Visita aggiornata', 'visita' => $visite]);
    }





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visite $visite)
    {
        $visite->delete();

        return response()->json(['message' => 'Visita eliminata con successo']);
    }
}
