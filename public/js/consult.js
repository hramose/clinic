options = [];
optionsPacient = [];
consultId = null;

function initConsult() {
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

    var consult = {
        motive: $("#motive").val(),
        actual_sickness: $("#actual_sickness").val(),
        id_pacient: optionsPacient[$("#id_pacient").val()],
        fc: $("#fc").val(),
        fr: $("#fr").val(),
        ta: $("#ta").val(),
        temperature: $("#temperature").val(),
        weight: $("#weight").val(),
        size: $("#size").val(),
        imc: $("#imc").val(),
        oximetria: $("#oximetria").val(),
        paraclinicos: $("#paraclinicos").val(),
        analisis: $("#analisis").val(),
        tratamiento: $("#tratamiento").val(),
        examen_fisico: $("#examen_fisico").val(),
        consult_date: new Date().toISOString().slice(0, 10),
    };
    console.log("binded object");
    console.log(consult);
    $.post("/consult", consult, function (data) {
        console.log(data);
        consultId = data.id;
    });
}