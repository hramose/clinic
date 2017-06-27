<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsultTa extends Migration {

    public static $TABLE_NAME = "consult";
    public static $COLUMNS = array(
        "consult_id", "motive", "actual_sickness", "fc", "fr", "ta"
        , "temperature", "weight", "size", "imc", "oximetria", "paraclinicos"
        , "analisis", "tratamiento", "id_pacient", "consult_date", "examen_fisico"
    );

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create(CreateConsultTa::$TABLE_NAME, function(Blueprint $table) {
            $table->increments(CreateConsultTa::$COLUMNS[0]);
            $table->text(CreateConsultTa::$COLUMNS[1]);
            $table->text(CreateConsultTa::$COLUMNS[2]);
            $table->integer(CreateConsultTa::$COLUMNS[3]);
            $table->integer(CreateConsultTa::$COLUMNS[4]);
            $table->integer(CreateConsultTa::$COLUMNS[5]);
            $table->integer(CreateConsultTa::$COLUMNS[6]);
            $table->integer(CreateConsultTa::$COLUMNS[7]);
            $table->integer(CreateConsultTa::$COLUMNS[8]);
            $table->double(CreateConsultTa::$COLUMNS[9], 2, 2);
            $table->double(CreateConsultTa::$COLUMNS[10], 2, 2);
            $table->text(CreateConsultTa::$COLUMNS[11]);
            $table->text(CreateConsultTa::$COLUMNS[12]);
            $table->text(CreateConsultTa::$COLUMNS[13]);
            $table->string(CreateConsultTa::$COLUMNS[14],15);
            $table->date(CreateConsultTa::$COLUMNS[15]);
            $table->text(CreateConsultTa::$COLUMNS[16]);
            $table->foreign(CreateConsultTa::$COLUMNS[14])
                    ->references(CreatePacientsTa::$COLUMNS[0])
                    ->on(CreatePacientsTa::$TABLE_NAME);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop(CreateConsultTa::$TABLE_NAME);
    }

}
