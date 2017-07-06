<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Consult;
use Illuminate\Support\Facades;

class ConsultController extends Controller {

    public function show($id) {
        $consult = Consult::find($id);
        return response()->json($consult, 201);
    }

    public function showAll() {
        $history = \DB::table('consult')
                ->select('*')
                ->join('pacient', 'pacient.n_documento', '=', 'id_pacient')
                ->orderBy('pacient.full_name', 'desc')
                ->get();
        return response()->json($history, 201);
    }

    public function history($pacientId) {
        $history = \DB::table('consult')
                ->select('*')
                ->join('pacient', 'pacient.n_documento', '=', 'id_pacient')
                ->where("id_pacient", $pacientId)
                ->orderBy('pacient.full_name', 'desc')
                ->get();
        return response()->json($history, 201);
    }

    public function create(Request $request) {
        $consult = Consult::create($request->all());
        return response()->json($consult, 201);
    }

    public function edit(Request $request, $id) {
        $consult = Consult::find($id);

        if (null !== $request->input('motive')) {
            $consult->motive = $request->input('motive');
        }if (null !== $request->input('actual_sickness')) {
            $consult->actual_sickness = $request->input('actual_sickness');
        }if (null !== $request->input('fc')) {
            $consult->fc = $request->input('fc');
        }if (null !== $request->input('fr')) {
            $consult->fr = $request->input('fr');
        }if (null !== $request->input('ta')) {
            $consult->ta = $request->input('ta');
        }if (null !== $request->input('tempereture')) {
            $consult->tempereture = $request->input('tempereture');
        }if (null !== $request->input('weight')) {
            $consult->weight = $request->input('weight');
        }if (null !== $request->input('size')) {
            $consult->size = $request->input('size');
        }if (null !== $request->input('imc')) {
            $consult->imc = $request->input('imc');
        }if (null !== $request->input('oximetria')) {
            $consult->oximetria = $request->input('oximetria');
        }if (null !== $request->input('paraclinicos')) {
            $consult->paraclinicos = $request->input('paraclinicos');
        }if (null !== $request->input('analisis')) {
            $consult->analisis = $request->input('analisis');
        }if (null !== $request->input('tratamiento')) {
            $consult->tratamiento = $request->input('tratamiento');
        }if (null !== $request->input('id_pacient')) {
            $consult->id_pacient = $request->input('id_pacient');
        }if (null !== $request->input('consult_date')) {
            $consult->consult_date = $request->input('consult_date');
        }if (null !== $request->input('examen_fisico')) {
            $consult->examen_fisico = $request->input('examen_fisico');
        }
        $consult->save();
        return response()->json($consult, 201);
    }

    public function delete($id) {
        $destroy = Consult::find($id);
        $destroy->delete();
        return response()->json(["delete" => TRUE], 204);
    }

}
