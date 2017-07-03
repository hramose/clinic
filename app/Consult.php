<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consult extends Model {

    public $timestamps = false;
    protected $table = 'consult';
    protected $fillable = [
        "consult_id", "motive", "actual_sickness", "fc", "fr", "ta"
        , "temperature", "weight", "size", "imc", "oximetria", "paraclinicos"
        , "analisis", "tratamiento", "id_pacient", "consult_date", "examen_fisico"
    ];
    protected $primaryKey = "consult_id";

}
