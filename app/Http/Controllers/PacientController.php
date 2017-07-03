<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Pacient;

class PacientController extends Controller {

    public function show($id) {
        $pacient = Pacient::where('n_documento', $id)->first();
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
        return response()->json($pacient, 201);
    }

    public function edit(Request $request, $id) {
        $pacient = Pacient::where('n_documento', $id)->get()[0];
        $pacient->full_name = $request->input('full_name');
        $pacient->last_name = $request->input('last_name');
        $pacient->doc_type = $request->input('doc_type');
        $pacient->gender = $request->input('gender');
        $pacient->birthdate = $request->input('birthdate');
        $pacient->scholar_level = $request->input('scholar_level');
        $pacient->phone = $request->input('phone');
        $pacient->address = $request->input('address');
        $pacient->family_past = $request->input('family_past');
        $pacient->medical_past = $request->input('medical_past');
        $pacient->surgical_past = $request->input('surgical_past');
        $pacient->allergy_past = $request->input('allergy_past');
        $pacient->toxic_past = $request->input('toxic_past');
        $pacient->traumatic_past = $request->input('traumatic_past');
        $pacient->immunological_past = $request->input('immunological_past');
        $pacient->menarquia = $request->input('menarquia');
        $pacient->cycles = $request->input('cycles');
        $pacient->gestacion = $request->input('gestacion');
        $pacient->partos = $request->input('partos');
        $pacient->abortos = $request->input('abortos');
        $pacient->ectopicos = $request->input('ectopicos');
        $pacient->cesarias = $request->input('cesarias');
        $pacient->fur = $request->input('fur');
        $pacient->pf = $request->input('pf');

        $pacient->save();
        return response()->json($pacient, 201);
    }

    public function delete($id) {
        $destroy = Pacient::where('n_documento', $id)->delete();
        return response()->json(['delete' => TRUE], 204);
    }

}
