<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PacientController extends Controller {

    public function show($id) {
        return new Response("", 201);
    }

    public function showAll() {
        return new Response("", 201);
    }

    public function create(Request $request) {
//        print_r($request->input());
        return new Response($request->input(), 201);
    }

    public function edit(Request $request) {
//        print_r($request->input());
        return new Response($request->input(), 201);
    }

    public function delete(Request $request) {
//        print_r($request->input());
        return new Response($request->input(), 201);
    }

}
