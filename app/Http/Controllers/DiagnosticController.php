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
//        $cieCodes = CIE10::where('description', $request->input('description'))->get();
        $search = $request->input('description');
        $cieCodes = CIE10::where('description', 'LIKE'
                        , "%{$search}%")->get();

        return response()->json($cieCodes, 201);
    }

    public function showDiagnostics($consultId) {
        $diagnostics = Diagnostic::where("consult_id", $consultId)->get();
        $ans = [];
        foreach ($diagnostics as $diagnostic) {
            array_push($ans, CIE10::find($diagnostic->diagnostic_id));
        }
        return response()->json($ans, 201);
    }

    public function add($consultId, $diagnosticId) {
        $diagnostic = Diagnostic::create([
                    "consult_id" => $consultId,
                    "diagnostic_id" => $diagnosticId,
        ]);
        return response()->json($diagnostic, 201);
    }

    public function delete($consultId, $diagnosticId) {
        Diagnostic::where("consult_id", $consultId)
                ->where("diagnostic_id", $diagnosticId)->delete();
        return response()->json(["delete" => true], 201);
    }

}
