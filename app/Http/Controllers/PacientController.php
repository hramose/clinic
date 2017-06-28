<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Pacient;

class PacientController extends Controller {

    public function show($id) {
        $pacient = Pacient::find($id);
        return response()->json($pacient, 201);
    }

    public function showAll() {
        $pacients = Pacient::all();
        return response()->json($pacients, 201);
//        return new Response($pacients,201);
    }

    public function filter(Request $request) {
        $searchName = $request->input('full_name');
        $searchLastName = $request->input('last_name');
        $searchID = $request->input('n_documento');

        $query = Pacient::where('full_name', 'LIKE'
                        , "%{$searchName}%")
                ->orWhere('last_name', 'LIKE', "%{$searchLastName}%")
                ->orWhere('n_documento', 'LIKE', "%{$searchID}%");
        $cieCodes = $query->get();
        return response()->json($cieCodes, 201);
    }

    public function create(Request $request) {
        $pacient = Pacient::create($request->all());
        $pacient->n_documento = $request->input('n_documento');
        return response()->json($pacient, 201);
    }

    public function edit(Request $request, $id) {
        $pacient = Pacient::find($id);

        $pacient->full_name = $request->full_name;
        $pacient->last_name = $request->last_name;
        $pacient->doc_type = $request->doc_type;
        $pacient->gender = $request->gender;
        $pacient->birthdate = $request->birthdate;
        $pacient->scholar_level = $request->scholar_level;
        $pacient->phone = $request->phone;
        $pacient->address = $request->address;
        $pacient->family_past = $request->family_past;
        $pacient->medical_past = $request->medical_past;
        $pacient->surgical_past = $request->surgical_past;
        $pacient->allergy_past = $request->allergy_past;
        $pacient->toxic_past = $request->toxic_past;
        $pacient->traumatic_past = $request->traumatic_past;
        $pacient->immunological_past = $request->immunological_past;
        $pacient->menarquia = $request->menarquia;
        $pacient->cycles = $request->cycles;
        $pacient->gestacion = $request->gestacion;
        $pacient->partos = $request->partos;
        $pacient->abortos = $request->abortos;
        $pacient->ectopicos = $request->ectopicos;
        $pacient->cesarias = $request->cesarias;
        $pacient->fur = $request->fur;
        $pacient->pf = $request->pf;

        return response()->json($pacient, 201);
    }

    public function delete($id) {
        $destroy = Pacient::find($id);
        $destroy->delete();
        return response()->json(["deleted" => TRUE], 204);
    }

}
