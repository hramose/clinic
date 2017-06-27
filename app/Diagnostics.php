<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diagnostics extends Model {

    public $timestamps = false;
    protected $table = "diagnostics";
    protected $fillable = ["consult_id", "diagnostic_id"];
    protected $primaryKey = ["consult_id", "diagnostic_id"];

}
