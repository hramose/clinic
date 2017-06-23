<?php

class ConsultTableTest extends TestCase {

    protected $TABLE_NAME = "consult";
    protected $COLUMNS = array(
        "consult_id", "motive", "actual_sickness", "fc", "fr", "ta", "ta"
        , "tempereture", "weight", "size", "imc", "oximetria", "paraclinicos"
        , "Analisis", "tratamiento", "id_pacient", "consult_date", "examen_fisico"
    );

    public function testTable() {
        $this->assertTrue(Schema::hasTable($this->TABLE_NAME));
    }

    public function testColumns() {
        foreach ($this->COLUMNS as $col) {
            $this->assertTrue(Schema::hasColumn($this->TABLE_NAME, $col));
        }
    }

}
