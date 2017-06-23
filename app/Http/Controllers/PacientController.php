<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PacientController extends Controller {

    public function show($id) {
        return $id;
    }

    public function create(Request $request) {
        print_r($request->input());
        return new Response($request->input(), 201);
    }

}
