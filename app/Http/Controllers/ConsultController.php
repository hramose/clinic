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

        $consult->motive = $request->input('motive');
        $consult->actual_sickness = $request->input('actual_sickness');
        $consult->fc = $request->input('fc');
        $consult->fr = $request->input('fr');
        $consult->ta = $request->input('ta');
        $consult->tempereture = $request->input('tempereture');
        $consult->weight = $request->input('weight');
        $consult->size = $request->input('size');
        $consult->imc = $request->input('imc');
        $consult->oximetria = $request->input('oximetria');
        $consult->paraclinicos = $request->input('paraclinicos');
        $consult->analisis = $request->input('analisis');
        $consult->tratamiento = $request->input('tratamiento');
        $consult->id_pacient = $request->input('id_pacient');
        $consult->consult_date = $request->input('consult_date');
        $consult->examen_fisico = $request->input('examen_fisico');
        $consult->save();
        return response()->json($consult, 201);
    }

    public function delete($id) {
        $destroy = Consult::find($id);
        $destroy->delete();
        return response()->json(["deleted" => TRUE], 204);
    }

}
