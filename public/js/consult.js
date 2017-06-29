options = [];
optionsPacient = [];
consultId = null;

function initConsultForm(consult) {
    $("#diagnostic_select").on("input", function () {
        if ($("#diagnostic_select").val().length < 3) {
            return;
        }
        $.post("/diagnostic", {description: $("#diagnostic_select").val()}, function (data) {
            var completeOptions = cleanData(data);
            $('input.autocomplete').autocomplete({
                data: completeOptions,
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function (val) {
                    // Callback function when value is autcompleted.
                },
                minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
        });
    });

    $("#id_pacient").on("input", function () {
        if ($("#id_pacient").val().length < 3) {
            return;
        }
        var sendData = {
            full_name: $("#id_pacient").val(),
            last_name: $("#id_pacient").val(),
            n_documento: $("#id_pacient").val()
        };
        console.log(sendData);

        $.post("/pacient/like", sendData, function (data) {
            var completeOptions = cleanDataPacient(data);
            $('input.autocomplete').autocomplete({
                data: completeOptions,
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function (val) {
                    // Callback function when value is autcompleted.
                },
                minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
        });
    });

    $("#create_consult").click(function () {
        dataConsultFromForm();
    });
    $("#size").change(function () {
        tryCalcIMC();
    });
    $("#weight").change(function () {
        tryCalcIMC();
    });

    $("#add_diagnostic").click(function () {
        $("#new-diagnostic").toggleClass("invisible");
    });

    $("#assoc_diagnostic").click(function () {
        associateDiagnostic();
    });
    if (consult && consult !== null) {
        associateFormConsult(consult);
    }
}

function associateDiagnostic() {
    var diagnosticId = options[$("#diagnostic_select").val()];
    if (consultId !== null
            && typeof (diagnosticId) != "undefined") {
        $.post("/diagnostic/" + consultId + "/" + diagnosticId, null, function (data) {
            console.log("diagnostic associated?");
            console.log(data);
        });
    } else if (consultId === null) {
        //add the consult
        dataConsultFromForm();
    }

    console.log(diagnosticId);
}


function cleanData(data) {
//    console.log(data);
    options = [];
    var ret = {};
    var key, value;
    for (var i = 0; i < data.length; i++) {
        key = data[i].code + " " + data[i].description;
        value = data[i].code;
        options[key] = value;
        ret[key] = null;
    }
//    console.log(ret);
    return ret;
}

function cleanDataPacient(data) {
    console.log(data);
    optionsPacient = [];
    var ret = {};
    var key, value;
    for (var i = 0; i < data.length; i++) {
        key = data[i].n_documento + " " + data[i].full_name + " " + data[i].last_name;
        value = data[i].n_documento;
        optionsPacient[key] = value;
        ret[key] = null;
    }
    console.log(ret);
    return ret;
}

function tryCalcIMC() {
    var division = "sin datos";
    var s = parseFloat($("#size").val());
    var w = parseFloat($("#weight").val());
    if (s !== "" && w !== "") {
        division = w / ((s / 100) * (s / 100));
    }
    $("#imc").val(division.toFixed(2));
}

function dataConsultFromForm() {
    var consult = new Consult();
    associateConsultForm(consult);
    console.log(consult);
    $.post("/consult", consult, function (data) {
        console.log(data);
        consultId = data.id;
    });
}

function associateConsultForm(consult) {
    consult.motive = $("#motive").val();
    consult.actual_sickness = $("#actual_sickness").val();
    consult.id_pacient = optionsPacient[$("#id_pacient").val()];
    consult.fc = $("#fc").val();
    consult.fr = $("#fr").val();
    consult.ta = $("#ta").val();
    consult.temperature = $("#temperature").val();
    consult.weight = $("#weight").val();
    consult.size = $("#size").val();
    consult.imc = $("#imc").val();
    consult.oximetria = $("#oximetria").val();
    consult.paraclinicos = $("#paraclinicos").val();
    consult.analisis = $("#analisis").val();
    consult.tratamiento = $("#tratamiento").val();
    consult.examen_fisico = $("#examen_fisico").val();
    consult.consult_date = new Date().toISOString().slice(0, 10);
}

function associateFormConsult(consult) {
    $("#motive").val(consult.motive);
    $("#actual_sickness").val(consult.actual_sickness);
    $("#id_pacient").val(consult.id_pacient);
    $("#fc").val(consult.fc);
    $("#fr").val(consult.fr);
    $("#ta").val(consult.ta);
    $("#temperature").val(consult.temperature);
    $("#weight").val(consult.weight);
    $("#size").val(consult.size);
    $("#imc").val(consult.imc);
    $("#oximetria").val(consult.oximetria);
    $("#paraclinicos").val(consult.paraclinicos);
    $("#analisis").val(consult.analisis);
    $("#tratamiento").val(consult.tratamiento);
    $("#examen_fisico").val(consult.examen_fisico);
}

function Consult(json) {
    if (json && json !== null) {
        this.motive = json.motive;
        this.actual_sickness = json.actual_sickness;
        this.id_pacient = json.id_pacient;
        this.fc = json.fc;
        this.fr = json.fr;
        this.ta = json.ta;
        this.temperature = json.temperature;
        this.weight = json.weight;
        this.size = json.size;
        this.imc = json.imc;
        this.oximetria = json.oximetria;
        this.paraclinicos = json.paraclinicos;
        this.analisis = json.analisis;
        this.tratamiento = json.tratamiento;
        this.examen_fisico = json.examen_fisico;
        this.consult_date = new Date().toISOString().slice(0, 10);
    }
}