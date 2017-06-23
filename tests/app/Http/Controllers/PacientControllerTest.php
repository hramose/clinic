<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

class PacientControllerTest extends TestCase {

    use DatabaseTransactions;

    public function testGetAllPacients() {
        $pacients = factory('App\Pacient', 10)->create();
        $this->get('/pacients');
        $this->seeStatusCode(201);
    }

    public function testGetPacient() {
        $pacient = factory('App\Pacient')->create();
        $this->get('/pacient/' . $pacient->n_documento);
        $this->seeStatusCode(201);
    }

}
