<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pacient extends Model {

    public $timestamps = false;
    protected $table = 'pacient';
    protected $fillable = [
        "n_documento", "full_name", "last_name"
        , "doc_type", "gender", "birthdate", "scholar_level", "phone"
        , "address", "family_past", "medical_past", "surgical_past"
        , "allergy_past", "toxic_past", "traumatic_past", "immunological_past"
        , "menarquia", "cycles", "gestacion", "partos", "abortos", "ectopicos"
        , "cesarias", "fur", "pf"
    ];
    
    public $incrementing = false;
    protected $primaryKey = "n_documento";

}
