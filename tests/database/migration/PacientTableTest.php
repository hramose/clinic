<?php

class PacientTableTest extends TestCase {

    protected $TABLE_NAME = "pacient";
    protected $COLUMNS = array("n_documento", "full_name",
        "last_name", "doc_type", "gender",
        "birthdate", "scholar_level", "phone", "address", "family_past"
        , "medical_past", "surgical_past", "allergy_past", "toxic_past",
        "traumatic_past", "immunological_past", "menarquia", "cycles",
        "gestacion", "partos", "abortos", "ectopicos", "cesarias", "fur", "pf"
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
