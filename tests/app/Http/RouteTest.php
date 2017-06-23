<?php

class RouteTest extends TestCase {

    public function testGetPacient() {
        $response = $this->call('GET', '/pacient');
        $this->assertEquals(201, $response->status());
    }

    public function testGetAllPacients() {
        $response = $this->call('GET', '/pacients');
        $this->assertEquals(201, $response->status());
    }

    public function testPostPacient() {
        $response = $this->call('POST', '/pacient');
        $this->assertEquals(201, $response->status());
    }

    public function testPutPacient() {
        $response = $this->call('PUT', '/pacient');
        $this->assertEquals(201, $response->status());
    }

    public function testDeletePacient() {
        $response = $this->call('DELETE', '/pacient');
        $this->assertEquals(201, $response->status());
    }

}
