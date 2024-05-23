<?php
namespace App\Http\Controllers\Api;

use App\Http\Resources\VisitResource;
use App\Models\Visite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVisitRequest;
use App\Http\Requests\UpdateVisitRequest;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon; // Importa la classe Carbon per la manipolazione delle date

class VisiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $visits = Visite::query()
                ->where('user_id', request()->user()->id)
                ->orderBy('visit_day')
                ->get();

            return response()->json(['visite' => $visits]);
        } catch (\Exception $e) {
            Log::error('Error fetching visits: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching visits.'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVisitRequest $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = $request->user()->id;

            \Log::info('Creating visit with data:', $data);

            $data['visit_day'] = Carbon::createFromFormat('d/m/Y', $data['visit_day']); // Conversione del formato della data

            $visite = Visite::create($data);

            return response()->json(new VisitResource($visite), 201);
        } catch (\Exception $e) {
            Log::error('Error creating visit: ' . $e->getMessage());
            return response()->json(['error' => 'Error creating visit.'], 500);
        }
    }

    /**
     * Cerca le visite
     */
    public function search(Request $request)
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
                $visits->whereDate('visit_day', $visitDay); // Usa whereDate per confrontare solo la data
            }

            $visits = $visits->orderBy('visit_day')->get();

            if ($visits->isEmpty()) {
                return response()->json(['message' => 'Nessuna visita trovata per i criteri di ricerca forniti.'], 404);
            }

            return response()->json(['visits' => $visits]);
        } catch (\Exception $e) {
            Log::error('Error fetching specific visits: ' . $e->getMessage());
            return response()->json(['error' => 'Si è verificato un errore durante la ricerca delle visite.'], 500);
        }
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVisitRequest $request, Visite $visite)
    {
        Log::info('Updating visit with ID: ' . $visite->id);

        Log::info('Request data: ' . json_encode($request->all()));

        try {
            $data = $request->validated();
            Log::info('Validated data:', $data);

            $data['user_id'] = $request->user()->id;
            Log::info('User ID:', ['user_id' => $data['user_id']]);

            // Rimuovi l'assegnazione del campo created_at per mantenerlo invariato
            unset($data['created_at']);

            // Aggiungi il campo updated_at con il timestamp corrente
            $data['updated_at'] = now();

            $visite->update($data);
            Log::info('Visit updated successfully.');

            return response()->json(new VisitResource($visite), 200);
        } catch (\Exception $e) {
            Log::error('Error updating visit: ' . $e->getMessage());
            return response()->json(['error' => 'Error updating visit.'], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visite $visite)
    {
        try {
            $visite->delete();

            return response()->json(['message' => 'Visita eliminata con successo']);
        } catch (\Exception $e) {
            Log::error('Error deleting visit: ' . $e->getMessage());
            return response()->json(['error' => 'Error deleting visit.'], 500);
        }
    }
}
