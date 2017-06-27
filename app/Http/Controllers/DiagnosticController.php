<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Consult;

class DiagnosticController extends Controller {

    public function show($id) {
        $consult = Consult::find($id);
        return response()->json($consult, 201);
    }

    public function showAll() {
        $history = Consult::all();
        return response()->json($history, 201);
    }

    public function history($pacientId) {
        $history = Consult::where("id_pacient",$pacientId)->get();
        return response()->json($history, 201);
    }

    public function create(Request $request) {
        $consult = Consult::create($request->all());
        return response()->json($consult, 201);
    }

    public function edit(Request $request, $id) {
        $consult = Consult::find($id);

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

        return response()->json($consult, 201);
    }

    public function delete($id) {
        $destroy = Consult::find($id);
        $destroy->delete();
        return response()->json(["deleted" => TRUE], 204);
    }

}
