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

//pacient
$app->get('/pacient/{id}', 'PacientController@show');
$app->get('/pacients', 'PacientController@showAll');
$app->post('/pacient', 'PacientController@create');
$app->post('/pacient/like', 'PacientController@filter');
$app->put('/pacient/{id}', 'PacientController@edit');
$app->delete('/pacient/{id}', 'PacientController@delete');

//consults
$app->get('/consult/{id}', 'ConsultController@show');
$app->post('/consult', 'ConsultController@create');
$app->put('/consult/{id}', 'ConsultController@edit');
$app->delete('/consult/{id}', 'ConsultController@delete');
$app->get('/consults', 'ConsultController@showAll');

//history
$app->get('/consults/{pacientId}', 'ConsultController@history');

//CIE10
$app->get('/diagnostics', 'DiagnosticController@showAll');
$app->post('/diagnostic', 'DiagnosticController@filter');
//diagnostics assoc
$app->get('/diagnostics/{consultId}', 'DiagnosticController@showDiagnostics');
$app->post('/diagnostic/{consultId}/{diagnosticId}', 'DiagnosticController@add');
$app->delete('/diagnostic/{consultId}/{diagnosticId}', 'DiagnosticController@delete');

