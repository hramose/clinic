<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Diagnostic;
use App\CIE10;

class DiagnosticController extends Controller {

    public function showAll() {
        $cieCodes = CIE10::all();
        return response()->json($cieCodes, 201);
    }

    public function filter(Request $request) {
        $cieCodes = CIE10::where('description', 'like '
                        , '%' . $request->input('description'))->get() . '%';
        return response()->json($cieCodes, 201);
    }

    public function add($consultId, $diagnosticId) {
        $diagnostic = Diagnostic::create([
                    "consult_id" => $consultId,
                    "diagnostic_id" => $diagnosticId,
        ]);
        return response()->json($diagnostic, 201);
    }

    public function delete($consultId, $diagnosticId) {
        $diagnostic = Diagnostic::where("consult_id", $consultId)
                        ->where("diagnostic_id", $diagnosticId)->get();
        $diagnostic->delete();
        return response()->json(["deleted" => TRUE], 201);
    }

}
