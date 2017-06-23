<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diagnostic extends Model {

    protected $table = 'cie10';
    protected $fillable = [
        "diagnostic_id"
        , "description"
    ];

}
