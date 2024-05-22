<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\VisitResource;
use App\Models\Visite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVisitRequest;
use App\Http\Requests\UpdateVisitRequest;

class VisiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visits = Visite::query()
            ->where('user_id', request()->user()->id)
            ->orderBy('visit_day')
            ->get();

        return response()->json(['visite' => $visits]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $visite = Visite::create($data);

        return response()->json(new VisitResource($visite), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        try {
            $user = $request->user();
            $name = $request->input('name');
            $email = $request->input('email');
            $visitDay = $request->input('visit_day');

            $visits = Visite::query()
                ->where('user_id', $user->id);

            if ($name) {
                $visits->where('name', 'like', '%' . $name . '%');
            }

            if ($email) {
                $visits->where('email', 'like', '%' . $email . '%');
            }

            if ($visitDay) {
                $visits->where('visit_day', $visitDay);
            }

            $visits = $visits->orderBy('visit_day')->get();

            if ($visits->isEmpty()) {
                return response()->json(['message' => 'Nessuna visita trovata per i criteri di ricerca forniti.'], 404);
            }

            return response()->json(['visite' => $visits]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Si è verificato un errore durante la ricerca delle visite.'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVisitRequest $request, Visite $visite)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;
        $visite->update($data);

        return response()->json(new VisitResource($visite), 200);
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
