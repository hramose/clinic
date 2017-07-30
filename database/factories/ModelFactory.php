<?php

/*
  |--------------------------------------------------------------------------
  | Model Factories
  |--------------------------------------------------------------------------
  |
  | Here you may define all of your model factories. Model factories give
  | you a convenient way to create models for testing and seeding your
  | database. Just tell the factory how a default model should look.
  |
 */

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
    ];
});

$factory->define(App\Pacient::class, function (Faker\Generator $faker) {
    return [
        'n_documento' => $faker->numberBetween(10, 1015642638),
        'full_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'phone' => $faker->numerify("##########"),
        'address' => substr($faker->address, 0, 30),
        'gender' => 'Masculino',
        'doc_type' => 'Cedula de Ciudadania',
        'scholar_level' => 'Analfabeta',
        'family_past' => $faker->text,
        'medical_past' => $faker->text,
        'surgical_past' => $faker->text,
        'allergy_past' => $faker->text,
        'toxic_past' => $faker->text,
        'civil_state' => 'Soltero',
        'traumatic_past' => $faker->text,
        'immunological_past' => $faker->text
    ];
});

$factory->define(App\Consult::class, function (Faker\Generator $faker) {
    $w = $faker->numberBetween(10, 180);
    $s = $faker->numberBetween(10, 260);
    return [
        'motive' => $faker->text,
        'actual_sickness' => $faker->text,
        'fc' => $faker->numberBetween(10, 60),
        'fr' => $faker->numberBetween(10, 60),
        'ta' => $faker->numberBetween(10, 60) . "-" . $faker->numberBetween(10, 60),
        'temperature' => $faker->numberBetween(36, 42),
        'weight' => $w,
        'size' => $s,
        'imc' => $w / (($s / 100) * ($s / 100)),
        'oximetria' => $faker->numberBetween(10, 100),
        'paraclinicos' => $faker->text,
        'analisis' => $faker->text,
        'tratamiento' => $faker->text,
        'id_pacient' => 0,
        'consult_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'examen_fisico' => $faker->text,
        'menarquia' => 15,
        'cycles' => '30/25',
        'gestacion' => 12,
        'partos' => 0,
        'abortos' => 2,
        'ectopicos' => 0,
        'cesarias' => 0,
        'fur' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'pf' => $faker->text,
    ];
});
