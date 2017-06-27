<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCie10Ta extends Migration {

    public static $TABLE_NAME = "cie10";
    public static $COLUMNS = array(
        "code", "description"
    );

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create(CreateCie10Ta::$TABLE_NAME, function(Blueprint $table) {
            $table->string(CreateCie10Ta::$COLUMNS[0],8);
            $table->text(CreateCie10Ta::$COLUMNS[1]);
            $table->primary(CreateCie10Ta::$COLUMNS[0]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop(CreateCie10Ta::$TABLE_NAME);
    }

}
