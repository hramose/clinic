<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->get('/pacient/{id}', 'PacientController@show');

$app->get('/pacients', 'PacientController@showAll');

$app->post('/pacient', 'PacientController@create');

$app->put('/pacient', 'PacientController@edit');

$app->delete('/pacient', 'PacientController@delete');

//TODO: create ConsultController
$app->get('/consult/{id}', 'PacientController@show');

$app->post('/consult/', 'PacientController@create');

$app->put('/consult/', 'PacientController@edit');

$app->delete('/consult/', 'PacientController@delete');