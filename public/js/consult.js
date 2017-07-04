options = [];
consultId = null;

function initConsultForm(consult) {
    addInputListeners();

    $("#consult-form").on("submit", function (e) {
        if (consultId === null || !optionsPacient[$("#id_pacient").val()]) {
            alert("Ha ocurrido un error y la consulta no ha sido guardada");
            e.preventDefault();
            return false;
        }
        var consult = new Consult();
        associateConsultForm(consult);
        consult.consult_id = consultId;
        editConsult(consult);
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
    $("#id_pacient").change(function () {
        var pacientId = optionsPacient[$("#id_pacient").val()];
        showPacientData(pacientId);
    });
    if (consult && consult !== null) {
        associateFormConsult(consult);
        $.get("pacient.html", null, function (data) {
            $("#pacient-container").html(data);
        });

        refreshDiagnosticList(consult.consult_id);
    } else {
        $.get("pacient_small.html", null, function (data) {
            $("#pacient-container").html(data);
        });
    }
}

function addInputListeners() {
    $("#diagnostic_select").on("input", function () {
        if ($("#diagnostic_select").val().length < 3) {
            return;
        }
        $.post("/diagnostic", {description: $("#diagnostic_select").val()}, function (data) {
            var completeOptions = cleanDiagnosticData(data);
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

    addPacientListener(optionsPacient);

}

function showPacientData(pacientId) {
    if (pacientId && pacientId !== null) {
        $.get("/pacient/" + pacientId, null, function (data) {
            var pacient = new Pacient(data);
            dataBindToView(pacient);
        });
    }
}

function deleteConsult(consult) {
    $.ajax({
        url: '/consult/' + consult.consult_id,
        type: 'DELETE',
        success: function (result) {
            // Do something with the result
            alert(result);
        }
    });
}

function editConsult(consult) {
    $.ajax({
        url: '/consult/' + consult.consult_id,
        type: 'PUT',
        data: consult,
        success: function (result) {
            // TODO: make it beauty
            alert("Creado exitosamente");
        }
    });
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

function createConsult(shouldAssoc) {
    var consult = new Consult();
    associateConsultForm(consult);
    console.log(consult);
    $.post("/consult", consult, function (data) {
        console.log(data);
        consultId = data.consult_id;
        if (shouldAssoc) {
            associateDiagnostic();
        }
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

function bindConsultToView(consult) {
    $("#motive").html(consult.motive);
    $("#actual_sickness").html(consult.actual_sickness);
    $("#id_pacient").html(consult.id_pacient);
    $("#fc").html(consult.fc);
    $("#fr").html(consult.fr);
    $("#ta").html(consult.ta);
    $("#temperature").html(consult.temperature);
    $("#weight").html(consult.weight);
    $("#size").html(consult.size);
    $("#imc").html(consult.imc);
    $("#oximetria").html(consult.oximetria);
    $("#paraclinicos").html(consult.paraclinicos);
    $("#analisis").html(consult.analisis);
    $("#tratamiento").html(consult.tratamiento);
    $("#examen_fisico").html(consult.examen_fisico);
    showPacientData(consult.id_pacient);
}

function Consult(json) {
    if (json && json !== null) {
        this.consult_id = json.consult_id;
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