<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class PacientControllerTest extends TestCase {

    use DatabaseTransactions;

    public function testGetAllPacients() {
        $pacients = factory('App\Pacient', 10)->create();
        $this->get('/pacients');
        $this->seeStatusCode(201);
        foreach ($pacients as $pacient) {
            $this->seeJson(PacientControllerTest::checkJson($pacient));
        }
    }

    public function testGetPacient() {
        $pacient = factory('App\Pacient')->create();
//        echo "route requested " . '/pacient/' . $pacient->n_documento . " fin---";
        $this->get('/pacient/' . $pacient->n_documento);
        $this->seeStatusCode(201);
        $this->seeJson(PacientControllerTest::checkJson($pacient));
    }

    public function testDeletePacient() {
        $pacient = factory('App\Pacient')->create();
        $this->delete('/pacient/' . $pacient->n_documento);
        $this->seeStatusCode(204);
        $this->seeJson(['delete' => TRUE]);
        $this->notSeeInDatabase('pacient', ['n_documento' => $pacient->n_documento]);
    }

    public function testEditPacient() {
        $update = [
            "full_name" => "Juan Carlos",
            "address" => "Calle Falsa 123"
        ];
        $pacient = factory('App\Pacient')->create();
        $this->put('/pacient/' . $pacient->n_documento, $update);
        $this->seeStatusCode(201);
        $this->seeJson($update);
        $this->seeInDatabase('pacient', $update);
    }

    public function testAddPacient() {
        $pacient = factory('App\Pacient')->make();
        $this->post('/pacient', PacientControllerTest::checkJson($pacient));
        $this->seeStatusCode(201);
        $this->seeJson(PacientControllerTest::checkJson($pacient));
        $this->seeInDatabase('pacient', ['n_documento' => $pacient->n_documento]);
    }

    public static function checkJson($pacient) {
        return [
            'full_name' => $pacient->full_name,
            'last_name' => $pacient->last_name,
            'n_documento' => "" . $pacient->n_documento,
            'phone' => $pacient->phone,
            'address' => $pacient->address,
            'gender' => $pacient->gender,
            'doc_type' => $pacient->doc_type,
            'scholar_level' => $pacient->scholar_level,
            'family_past' => $pacient->family_past,
            'medical_past' => $pacient->medical_past,
            'surgical_past' => $pacient->surgical_past,
            'allergy_past' => $pacient->allergy_past,
            'toxic_past' => $pacient->toxic_past,
            'traumatic_past' => $pacient->traumatic_past,
            'immunological_past' => $pacient->immunological_past,
            'menarquia' => $pacient->menarquia,
            'cycles' => $pacient->cycles,
            'gestacion' => $pacient->gestacion,
            'partos' => $pacient->partos,
            'abortos' => $pacient->abortos,
            'ectopicos' => $pacient->ectopicos,
            'cesarias' => $pacient->cesarias,
            'fur' => $pacient->fur,
            'pf' => $pacient->pf
        ];
    }

}
