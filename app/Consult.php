<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consult extends Model {

    protected $table = 'consult';
    protected $fillable = [
        "consult_id", "motive", "actual_sickness", "fc", "fr", "ta", "ta"
        , "tempereture", "weight", "size", "imc", "oximetria", "paraclinicos"
        , "Analisis", "tratamiento", "id_pacient", "consult_date", "examen_fisico"
    ];

}
