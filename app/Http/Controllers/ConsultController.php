<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Consult;

class ConsultController extends Controller {

    public function show($id) {
        $consult = Consult::find($id);
        return response()->json($consult, 201);
    }

    public function showAll() {
        $history = Consult::all();
        return response()->json($history, 201);
    }

    public function history($pacientId) {
        $history = Consult::where("id_pacient", $pacientId)->get();
        return response()->json($history, 201);
    }

    public function create(Request $request) {
        $consult = Consult::create($request->all());
        return response()->json($consult, 201);
    }

    public function edit(Request $request, $id) {
        $consult = Consult::find($id);

        $consult->motive = $request->motive;
        $consult->actual_sickness = $request->actual_sickness;
        $consult->fc = $request->fc;
        $consult->fr = $request->fr;
        $consult->ta = $request->ta;
        $consult->tempereture = $request->tempereture;
        $consult->weight = $request->weight;
        $consult->size = $request->size;
        $consult->imc = $request->imc;
        $consult->oximetria = $request->oximetria;
        $consult->paraclinicos = $request->paraclinicos;
        $consult->analisis = $request->analisis;
        $consult->tratamiento = $request->tratamiento;
        $consult->id_pacient = $request->id_pacient;
        $consult->consult_date = $request->consult_date;
        $consult->examen_fisico = $request->examen_fisico;

        return response()->json($consult, 201);
    }

    public function delete($id) {
        $destroy = Consult::find($id);
        $destroy->delete();
        return response()->json(["deleted" => TRUE], 204);
    }

}
