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
        'full_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'n_documento' => $faker->bankAccountNumber,
        'phone' => $faker->phoneNumber,
        'address' => $faker->address,
        'gender' => 'Masculino',
        'doc_type' => 'Cedula de Ciudadania',
        'scholar_level' => 'Analfabeta',
        'family_past' => $faker->text,
        'medical_past' => $faker->text,
        'surgical_past' => $faker->text,
        'allergy_past' => $faker->text,
        'toxic_past' => $faker->text,
        'traumatic_past' => $faker->text,
        'immunological_past' => $faker->text,
        'menarquia' => 15,
        'cycles' => '30/25',
        'gestacion' => '12',
    ];
});
