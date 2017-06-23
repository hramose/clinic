<?php

class DiagnosticsTableTest extends TestCase {

    protected $TABLE_NAME = "diagnostics";
    protected $COLUMNS = array(
        "consult_id", "diagnostic_id"
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
