<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pacient;

class PacientController extends Controller {

    public function show($id) {
        $pacient = Pacient::where('n_documento', $id)->first();
        return response()->json($pacient, 201);
    }

    public function showAll() {
        $pacients = Pacient::all();
        return response()->json($pacients, 201);
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
        if (null !== $request->input('full_name')) {
            $pacient->full_name = $request->input('full_name');
        }if (null !== $request->input('last_name')) {
            $pacient->last_name = $request->input('last_name');
        }if (null !== $request->input('doc_type')) {
            $pacient->doc_type = $request->input('doc_type');
        }if (null !== $request->input('gender')) {
            $pacient->gender = $request->input('gender');
        }if (null !== $request->input('birthdate')) {
            $pacient->birthdate = $request->input('birthdate');
        }if (null !== $request->input('scholar_level')) {
            $pacient->scholar_level = $request->input('scholar_level');
        }if (null !== $request->input('phone')) {
            $pacient->phone = $request->input('phone');
        }if (null !== $request->input('address')) {
            $pacient->address = $request->input('address');
        }if (null !== $request->input('family_past')) {
            $pacient->family_past = $request->input('family_past');
        }if (null !== $request->input('medical_past')) {
            $pacient->medical_past = $request->input('medical_past');
        }if (null !== $request->input('surgical_past')) {
            $pacient->surgical_past = $request->input('surgical_past');
        }if (null !== $request->input('allergy_past')) {
            $pacient->allergy_past = $request->input('allergy_past');
        }if (null !== $request->input('toxic_past')) {
            $pacient->toxic_past = $request->input('toxic_past');
        }if (null !== $request->input('traumatic_past')) {
            $pacient->traumatic_past = $request->input('traumatic_past');
        }if (null !== $request->input('immunological_past')) {
            $pacient->immunological_past = $request->input('immunological_past');
        }if (null !== $request->input('menarquia')) {
            $pacient->menarquia = $request->input('menarquia');
        }if (null !== $request->input('cycles')) {
            $pacient->cycles = $request->input('cycles');
        }if (null !== $request->input('gestacion')) {
            $pacient->gestacion = $request->input('gestacion');
        }if (null !== $request->input('partos')) {
            $pacient->partos = $request->input('partos');
        }if (null !== $request->input('abortos')) {
            $pacient->abortos = $request->input('abortos');
        }if (null !== $request->input('ectopicos')) {
            $pacient->ectopicos = $request->input('ectopicos');
        }if (null !== $request->input('cesarias')) {
            $pacient->cesarias = $request->input('cesarias');
        }if (null !== $request->input('fur')) {
            $pacient->fur = $request->input('fur');
        }if (null !== $request->input('pf')) {
            $pacient->pf = $request->input('pf');
        }
        $pacient->save();
        return response()->json($pacient, 201);
    }

    public function delete($id) {
        Pacient::where('n_documento', $id)->delete();
        return response()->json(['delete' => TRUE], 204);
    }

}
