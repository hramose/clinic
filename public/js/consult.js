var options = [];
var consultId = null;
var $inputFUR = null;
var pickerFUR = null;


function initConsultForm(consult) {
    addInputListeners();

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 80, // Creates a dropdown of 15 years to control year
        max: new Date()
    });

    $("#consult-form").on("submit", function (e) {
        if (consultId === null
                || !optionsPacient[$("#id_pacient").val()]) {
            displayMessage("Ha ocurrido un error y la consulta no ha sido guardada");
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
    $inputFUR = $('#fur').pickadate();
    pickerFUR = $inputFUR.pickadate('picker');


    if (consult && consult !== null) {
        associateConsultToForm(consult);
        $("#form-header-text").html("Editar Consulta");
        $("#create_consult").html("Guardar <i class='material-icons right'>save</i>");
        refreshDiagnosticList(consult.consult_id, true);
        showPacientData(consult.id_pacient, consult);
        $("#id_pacient").attr("disabled", true);
        Materialize.updateTextFields();
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
                minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
        });
    });

    addPacientListener();

}

function showPacientData(pacientId, consult) {
    if (pacientId && pacientId !== null) {
        $.get("pacient_small.html", null, function (data) {
            $("#pacient-container").html(data);
            $.get("/pacient/" + pacientId, null, function (data) {
                var pacient = new Pacient(data);
                dataBindToView(pacient);
                var key = pacient.n_documento + " " + pacient.full_name + " " + pacient.last_name;
                optionsPacient[key] = pacient.n_documento;
                if (pacient.gender === 'Masculino') {
                    $("#woman_past").addClass("invisible");
                    cleanWomanInputs();
                } else {
                    $("#woman_past").removeClass("invisible");
                }
                if (consult !== null) {
                    showWomenDataToView(consult);
                }
            });
        });
    }
}

function cleanWomanInputs() {
    $("#menarquia").val("");
    $("#cycles").val("");
    $("#gestacion").val("");
    $("#partos").val("");
    $("#abortos").val("");
    $("#ectopicos").val("");
    $("#cesarias").val("");
    pickerFUR.set("");
    $("#pf").val("");
}

function showWomenDataToView(consult) {
    if (consult.pacient_gender === "Femenino") {
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
        success: function () {
            loadContent({page: "consults_list.html", type: CONSULT_LIST_VIEW});
        }
    });
}

function loadConsults() {
    addPacientListener();
    $.get("/consults", null, function (data) {
        $("#consults_list").append(inflateConsultList(data));
    });

    $("#look_history_btn").click(function () {
        var selectedID = optionsPacient[$("#id_pacient").val()];
        if (typeof (selectedID) == "undefined") {
            return;
        }
        $.get("/consults/" + selectedID, null, function (data) {
            $("#consults_list").html("");
            $("#consults_list").append(inflateConsultList(data));
        });
    });
}

function editConsult(consult) {
    $.ajax({
        url: '/consult/' + consult.consult_id,
        type: 'PUT',
        data: consult,
        success: function () {
            displayMessage("Creado exitosamente");
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
    $.post("/consult", consult, function (data) {
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
    consult.menarquia = $("#menarquia").val();
    consult.cycles = $("#cycles").val();
    consult.gestacion = $("#gestacion").val();
    consult.partos = $("#partos").val();
    consult.abortos = $("#abortos").val();
    consult.ectopicos = $("#ectopicos").val();
    consult.cesarias = $("#cesarias").val();
    consult.fur = pickerFUR.get('select', 'yyyy-mm-dd');
    consult.pf = $("#pf").val();
}

function associateConsultToForm(consult) {
    $("#motive").val(consult.motive);
    $("#actual_sickness").val(consult.actual_sickness);
    $("#id_pacient").val(consult.pacient_n_documento + " "
            + consult.pacient_full_name + " "
            + consult.pacient_last_name);
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
    if (consult.pacient_gender != "Masculino") {
        $("#menarquia").val(consult.menarquia);
        $("#cycles").val(consult.cycles);
        $("#gestacion").val(consult.gestacion);
        $("#partos").val(consult.partos);
        $("#abortos").val(consult.abortos);
        $("#ectopicos").val(consult.ectopicos);
        $("#cesarias").val(consult.cesarias);
        pickerFUR.set('select', consult.fur);
        $("#pf").val(consult.pf);
    }
}

function bindConsultToView(consult) {
    $("#form-header-text").append(" " + consult.consult_id);
    $("#form-header-text").append("<br />Fecha: " + consult.consult_date);
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
    bindPacientDataInConsult(consult);
    refreshDiagnosticList(consult.consult_id, false);
}

function bindPacientDataInConsult(consult) {
    $("#doc_type").html(consult.pacient_doc_type);
    $("#n_documento").html(consult.pacient_n_documento);
    $("#full_name").html(consult.pacient_full_name);
    $("#last_name").html(consult.pacient_last_name);
    $("#gender").html(consult.pacient_gender);
    $('#birthdate').html(consult.pacient_birthdate);
    $("#scholar_level").html(consult.pacient_scholar_level);
    $("#phone").html(consult.pacient_phone);
    $("#address").html(consult.pacient_address);
    $("#family_past").html(consult.pacient_family_past);
    $("#medical_past").html(consult.pacient_medical_past);
    $("#surgical_past").html(consult.pacient_surgical_past);
    $("#allergy_past").html(consult.pacient_allergy_past);
    $("#toxic_past").html(consult.pacient_toxic_past);
    $("#traumatic_past").html(consult.pacient_traumatic_past);
    $("#immunological_past").html(consult.pacient_immunological_past);
    if (consult.pacient_gender === 'Masculino') {
        $("#woman_past").addClass("invisible");
        $("#pacient-main-data").removeClass("m6");
    } else {
        $("#woman_past").removeClass("invisible");
    }
    if (consult !== null) {
        showWomenDataToView(consult);
    }
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
        if (typeof (json.n_documento) != "undefined") {
            this.pacient_doc_type = json.doc_type;
            this.pacient_n_documento = json.n_documento;
            this.pacient_full_name = json.full_name;
            this.pacient_last_name = json.last_name;
            this.pacient_gender = json.gender;
            this.pacient_birthdate = json.birthdate;
            this.pacient_scholar_level = json.scholar_level;
            this.pacient_phone = json.phone;
            this.pacient_address = json.address;
            this.pacient_family_past = json.family_past;
            this.pacient_medical_past = json.medical_past;
            this.pacient_surgical_past = json.surgical_past;
            this.pacient_allergy_past = json.allergy_past;
            this.pacient_toxic_past = json.toxic_past;
            this.pacient_traumatic_past = json.traumatic_past;
            this.pacient_immunological_past = json.immunological_past;
        }
        this.getInitials = function () {
            if (typeof (this.pacient_full_name) != "string"
                    || typeof (this.pacient_last_name) != "string") {
                return "";
            }
            var FN = this.pacient_full_name.toUpperCase().split(" ")[0];
            var LN = this.pacient_last_name.toUpperCase().split(" ")[0];
            return FN.charAt(0) + "" + LN.charAt(0);
        };
    }
}