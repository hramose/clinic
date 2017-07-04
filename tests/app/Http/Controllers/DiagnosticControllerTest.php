<?php

use Laravel\Lumen\Testing\DatabaseTransactions;
use App\CIE10;

class DiagnosticControllerTest extends TestCase {

    use DatabaseTransactions;

    public function testAddDiagnostic() {
        $consult = factory('App\Consult')->make();
        $pacient = factory('App\Pacient')->create();
        $consult->id_pacient = $pacient->n_documento;
        $consult->save();
        $diagnostic = CIE10::find('A000');

        $this->post('/diagnostic/' . $consult->consult_id . "/" . $diagnostic->code);
        $this->seeStatusCode(201);

        $this->seeJson(DiagnosticControllerTest::checkJson($consult, $diagnostic));
        $this->seeInDatabase("diagnostics", DiagnosticControllerTest::checkJson($consult, $diagnostic));
    }

    public function testDeleteDiagnostic() {
        $consult = factory('App\Consult')->make();
        $pacient = factory('App\Pacient')->create();
        $consult->id_pacient = $pacient->n_documento;
        $consult->save();
        $diagnostic = CIE10::find('A000');

        $this->delete('/diagnostic/' . $consult->consult_id . "/" . $diagnostic->code);
        $this->seeStatusCode(201);

        $this->seeJson(["delete" => TRUE]);
        $this->notSeeInDatabase("diagnostics", DiagnosticControllerTest::checkJson($consult, $diagnostic));
    }

    public function testShowDiagnostics() {
        $consult = factory('App\Consult')->make();
        $pacient = factory('App\Pacient')->create();
        $consult->id_pacient = $pacient->n_documento;
        $consult->save();

        //prepare environment
        $diagnostic1 = CIE10::find('A000');
        $this->post('/diagnostic/' . $consult->consult_id . "/" . $diagnostic1->code);
        $this->seeStatusCode(201);

        $diagnostic2 = CIE10::find('A010');
        $this->post('/diagnostic/' . $consult->consult_id . "/" . $diagnostic2->code);
        $this->seeStatusCode(201);

        $diagnostic3 = CIE10::find('A039');
        $this->post('/diagnostic/' . $consult->consult_id . "/" . $diagnostic3->code);
        $this->seeStatusCode(201);

        $this->get("/diagnostics/" . $consult->consult_id);
        $this->seeStatusCode(201);
        $this->seeJson(["code"=>$diagnostic1->code]);
        $this->seeJson(["code"=>$diagnostic2->code]);
        $this->seeJson(["code"=>$diagnostic3->code]);
    }

    public static function checkJson($consul, $diagnostic) {
        return [
            "consult_id" => "" . $consul->consult_id,
            "diagnostic_id" => $diagnostic->code
        ];
    }

}
