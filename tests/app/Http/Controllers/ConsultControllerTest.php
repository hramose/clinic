<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class ConsultControllerTest extends TestCase {

    use DatabaseTransactions;

    public function testGetAllConsults() {
        $consults = factory('App\Consult', 1)->make();
        $pacient = factory('App\Pacient')->create();
        foreach ($consults as $consult) {
            $consult->id_pacient = $pacient->n_documento;
            $consult->save();
        }
        $this->get('/consults');
        $this->seeStatusCode(201);
        foreach ($consults as $consult) {
            $this->seeJson(ConsultControllerTest::checkJson($consult));
        }
    }

    public function testHistory() {
        $consults = factory('App\Consult', 1)->make();
        $pacient = factory('App\Pacient')->create();
        foreach ($consults as $consult) {
            $consult->id_pacient = $pacient->n_documento;
            $consult->save();
        }
        $this->get('/consults/' . $pacient->n_documento);
        $this->seeStatusCode(201);
        foreach ($consults as $consult) {
            $this->seeJson(ConsultControllerTest::checkJson($consult));
        }
    }

    public function testGetConsult() {
        $pacient = factory('App\Pacient')->create();
        $consult = factory('App\Consult')->make();
        $consult->id_pacient = $pacient->n_documento;
        $consult->save();
        $this->get('/consult/' . $consult->consult_id);
        $this->seeStatusCode(201);
        $this->seeJson(ConsultControllerTest::checkJson($consult));
    }

    public function testDeleteConsult() {
        $pacient = factory('App\Pacient')->create();
        $consult = factory('App\Consult')->make();
        $consult->id_pacient = $pacient->n_documento;
        $consult->save();
        $this->delete('/consult/' . $consult->consult_id);
        $this->seeStatusCode(204);
        $this->seeJson(['delete' => TRUE]);
        $this->notSeeInDatabase('consult', ['motive' => $consult->motive]);
    }

    public function testEditConsult() {
        $update = [
            "motive" => "Dolores extranios",
            "paraclinicos" => " 30"
        ];
        $pacient = factory('App\Pacient')->create();
        $consult = factory('App\Consult')->make();
        $consult->id_pacient = $pacient->n_documento;
        $consult->save();
        $this->put('/consult/' . $consult->consult_id, $update);
        $this->seeStatusCode(201);
        $this->seeJson($update);
        $this->seeInDatabase('consult', $update);
    }

    public function testAddConsult() {
        $consult = factory('App\Consult')->make();
        $pacient = factory('App\Pacient')->create();
        $consult->id_pacient = $pacient->n_documento;
        $this->post('/consult', ConsultControllerTest::checkJson($consult));
        $this->seeStatusCode(201);
        $this->seeJson(ConsultControllerTest::checkJson($consult));
        $this->seeInDatabase('consult', ['motive' => $consult->motive]);
    }

    public static function checkJson($consult) {
        return [
//            "consult_id" => $consult->consult_id,
            'motive' => $consult->motive,
            'actual_sickness' => $consult->actual_sickness,
            'fc' => $consult->fc,
            'fr' => $consult->fr,
            'ta' => $consult->ta,
            'temperature' => $consult->temperature,
            'weight' => $consult->weight,
            'size' => $consult->size,
//            'imc' => $consult->imc,
            'oximetria' => $consult->oximetria,
            'paraclinicos' => $consult->paraclinicos,
            'analisis' => $consult->analisis,
            'tratamiento' => $consult->tratamiento,
            'id_pacient' => "" . $consult->id_pacient,
            'consult_date' => $consult->consult_date,
            'examen_fisico' => $consult->examen_fisico,
            'menarquia' => $consult->menarquia,
            'cycles' => $consult->cycles,
            'gestacion' => $consult->gestacion,
            'partos' => $consult->partos,
            'abortos' => $consult->abortos,
            'ectopicos' => $consult->ectopicos,
            'cesarias' => $consult->cesarias,
            'fur' => $consult->fur,
            'pf' => $consult->pf
        ];
    }

}
