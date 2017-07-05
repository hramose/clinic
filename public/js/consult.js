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
        associateFormToConsult(consult);
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
        showPacientData(pacientId, null);
    });

    if (consult && consult !== null) {
        associateConsultToForm(consult);
        $("#form-header-text").html("Editar Consulta");
        $("#create_consult").html("Guardar <i class='material-icons right'>save</i>");
        refreshDiagnosticList(consult.consult_id);
        showPacientData(consult.id_pacient, consult);

    }

    $.get("pacient_small.html", null, function (data) {
        $("#pacient-container").html(data);
    });

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

function showPacientData(pacientId, consult) {
    if (pacientId && pacientId !== null) {
        $.get("/pacient/" + pacientId, null, function (data) {
            var pacient = new Pacient(data);
            dataBindToView(pacient);
            var key = pacient.n_documento + " " + pacient.full_name + " " + pacient.last_name;
            optionsPacient[key] = pacient.n_documento;
            if (consult !== null) {
                showWomenDataToView(pacient, consult);
            }
        });
    }
}
function showWomenDataToView(pacient, consult) {
    if (pacient.gender === "Femenino") {
        $("#menarquia").html(consult.menarquia);
        $("#cycles").html(consult.cycles);
        $("#gestacion").html(consult.gestacion);
        $("#partos").html(consult.partos);
        $("#abortos").html(consult.abortos);
        $("#ectopicos").html(consult.ectopicos);
        $("#cesarias").html(consult.cesarias);
        $("#fur").html(consult.fur);
        $("#pf").html(consult.pf);
    }
}

function deleteConsult(consult) {
    $.ajax({
        url: '/consult/' + consult.consult_id,
        type: 'DELETE',
        success: function (result) {
            // Do something with the result
            alert("Borrado Exitosamente");
            loadContent({page: "consults_list.html", type: CONSULT_LIST_VIEW});
        }
    });
}

function loadConsults() {
    $.get("/consults", null, function (data) {
        console.log(data);
        $("#consults_list").append(inflateConsultList(data));
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
    associateFormToConsult(consult);
    console.log(consult);
    $.post("/consult", consult, function (data) {
        console.log(data);
        consultId = data.consult_id;
        if (shouldAssoc) {
            associateDiagnostic();
        }
    });
}

function associateFormToConsult(consult) {
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

function associateConsultToForm(consult) {
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
    consultId = consult.consult_id;
}

function bindConsultToView(consult) {
    $.get("pacient-print.html", null, function (data) {
        $("#pacient-container").html(data);
    });
    $("#form-header-text").append(consult.consult_id);
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
    showPacientData(consult.id_pacient, consult);
    consultId = consult.consult_id;
    refreshDiagnosticList(consult.consult_id, false);

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
        this.menarquia = json.menarquia;
        this.cycles = json.cycles;
        this.gestacion = json.gestacion;
        this.partos = json.partos;
        this.abortos = json.abortos;
        this.ectopicos = json.ectopicos;
        this.cesarias = json.cesarias;
        this.fur = json.fur;
        this.pf = json.pf;
    }
}