<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiagnosticsTa extends Migration
{
    public static $TABLE_NAME = "diagnostics";
    public static $COLUMNS = array(
        "consult_id", "diagnostic_id"
    );

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create(CreateDiagnosticsTa::$TABLE_NAME, function(Blueprint $table) {
            $table->unsignedInteger(CreateDiagnosticsTa::$COLUMNS[0]);
            $table->string(CreateDiagnosticsTa::$COLUMNS[1],5);
            $table->primary([CreateDiagnosticsTa::$COLUMNS[0],CreateDiagnosticsTa::$COLUMNS[1]]);
            
            $table->foreign(CreateDiagnosticsTa::$COLUMNS[0])
                    ->references(CreateConsultTa::$COLUMNS[0])
                    ->on(CreateConsultTa::$TABLE_NAME);
            
            $table->foreign(CreateDiagnosticsTa::$COLUMNS[1])
                    ->references(CreateCie10Ta::$COLUMNS[0])
                    ->on(CreateCie10Ta::$TABLE_NAME);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop(CreateDiagnosticsTa::$TABLE_NAME);
    }
}
