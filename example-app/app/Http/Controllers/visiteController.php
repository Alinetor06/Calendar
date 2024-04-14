<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Visite;
use Illuminate\Http\Request;

class visiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visits = Visite::query()
            ->where('userId', request()->user()->id)
            ->orderBy('giorno della visita')
            ->get();

        return view('calendar.home', ['visite', $visits]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return view('calendar.create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'età' => ['required', 'integer'],
            'note' => ['required', 'string'],
            'giorno della visita' => ['required', 'date'],
            'importanza' => ['required', 'string'],
        ]);

        $data['userId'] = $request->user()->id;
        $visite = Visite::create($data);

        return to_route('calendario.show', $visite->id)->with('message', 'Visita creata');
    }

    /**
     * Display the specified resource.
     */
    public function show(Visite $visite)
    {
        return view('calendario.show', ['visite' => $visite]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Visite $visite)
    {
        return view('calendario.edit', ['visite' => $visite]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Visite $visite)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'età' => ['required', 'integer'],
            'note' => ['required', 'string'],
            'giorno della visita' => ['required', 'date'],
            'importanza' => ['required', 'string'],
        ]);

        $visite->update($data);

        return to_route('calendario.show', $visite->id)->with('message', 'Visita creata');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visite $visite)
    {
        $visite->delete();
    }
}
