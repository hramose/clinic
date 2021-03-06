<?php

class Cie_10TableTest extends TestCase {

    protected $TABLE_NAME = "cie10";
    protected $COLUMNS = array(
        "code", "description","group_cie"
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
