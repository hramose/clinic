<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diagnostic extends Model {

    protected $table = 'diagnostics';
    protected $fillable = [
        "consult_id", "diagnostic_id"
    ];

}
