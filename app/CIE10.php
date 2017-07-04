<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CIE10 extends Model {

    public $timestamps = false;
    protected $table = "cie10";
    protected $fillable = ["code", "description","group_cie"];
    
    public $incrementing = false;
    protected $primaryKey = "code";

}
