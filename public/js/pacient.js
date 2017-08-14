function initPacientForm(pacient = null, toView) {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 80, // Creates a dropdown of 15 years to control year
        max: new Date()
    });
    $('ul.tabs').tabs();

    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').material_select();
    if (pacient !== null) {
        if (toView) {
            dataBindToView(pacient);
        } else {
            dataBindToForm(pacient);
            $("#create_pacient").html("Editar");
            $("#pacient-form").on('submit', function () {
                dataBindFromForm(pacient);
                editPacient(pacient);
                return false;
            });
        }
    } else {
        $("#pacient-form").on('submit', function () {
            createPacient();
            return false;
        });
}
}

function loadPacients() {
    addPacientListener();
    $.get("/pacients", null, function (data) {
        $("#pacient_list").append(inflatePacientList(data));
    });
    $("#look_pacient_btn").click(function () {
        var selectedID = optionsPacient[$("#id_pacient").val()];
        if (typeof (selectedID) == "undefined") {
            displayMessage("no se selecciono correctamente");
            return;
        }
        var sendData = {
            full_name: selectedID,
            last_name: selectedID,
            n_documento: selectedID
        };
        $.post("/pacient/like", sendData, function (data) {
            $("#pacient_list").html("");
            $("#pacient_list").append(inflatePacientList(data));
        });
    });
}


function addPacientListener() {
    $("#id_pacient").on("input", function () {
        if ($("#id_pacient").val().length < 3) {
            return;
        }
        var sendData = {
            full_name: $("#id_pacient").val(),
            last_name: $("#id_pacient").val(),
            n_documento: $("#id_pacient").val()
        };

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
}

function createPacient() {
    var pacient = new Pacient();
    dataBindFromForm(pacient);
    $.ajax({
        url: "/pacient",
        type: 'POST',
        data: pacient,
        success: function () {
            loadContent({page: "pacients_list.html", type: PACIENTS_LIST_VIEW});
        },
        error: function () {
            displayMessage("Error en la creación");
        }
    });
}

function deletePacient(pacient) {
    $.ajax({
        url: '/pacient/' + pacient.n_documento,
        type: 'DELETE',
        success: function () {
            loadContent({page: "pacients_list.html", type: PACIENTS_LIST_VIEW});
        },
        error: function () {
            displayMessage("Error eliminado a " + pacient.full_name);
        }
    });
}

function editPacient(pacient) {
    $.ajax({
        url: '/pacient/' + pacient.n_documento,
        type: 'PUT',
        data: pacient,
        success: function () {
            displayMessage("Editado con exito");
            loadContent({page: "pacients_list.html", type: PACIENTS_LIST_VIEW});
        },
        error: function () {
            displayMessage("Error en la edicion de "
                    + pacient.family_past
                    + " seguramente el numero de identificacion ya existe : "
                    + pacient.n_documento);
        }
    });
}


function dataBindFromForm(pacient) {
    var $inputB = $('#birthdate').pickadate();
    var pickerB = $inputB.pickadate('picker');
    pacient.doc_type = $("#doc_type").val();
    pacient.n_documento = $("#n_documento").val();
    pacient.full_name = $("#full_name").val();
    pacient.last_name = $("#last_name").val();
    pacient.gender = $("#gender").val();
    pacient.birthdate = pickerB.get('select', 'yyyy-mm-dd');
    pacient.scholar_level = $("#scholar_level").val();
    pacient.phone = $("#phone").val();
    pacient.address = $("#address").val();
    pacient.family_past = $("#family_past").val();
    pacient.medical_past = $("#medical_past").val();
    pacient.surgical_past = $("#surgical_past").val();
    pacient.allergy_past = $("#allergy_past").val();
    pacient.toxic_past = $("#toxic_past").val();
    pacient.traumatic_past = $("#traumatic_past").val();
    pacient.immunological_past = $("#immunological_past").val();
    pacient.civil_state = $("#civil_state").val();
}

function dataBindToForm(pacient) {
    var $inputB = $('#birthdate').pickadate();
    var pickerB = $inputB.pickadate('picker');

    $("#doc_type").val(pacient.doc_type);
    $("#n_documento").val(pacient.n_documento);
    $("#full_name").val(pacient.full_name);
    $("#last_name").val(pacient.last_name);
    $("#gender").val(pacient.gender);
    pickerB.set('select', pacient.birthdate, {format: 'yyyy-mm-dd'});
    $("#scholar_level").val(pacient.scholar_level);
    $("#phone").val(pacient.phone);
    $("#address").val(pacient.address);
    $("#family_past").val(pacient.family_past);
    $("#medical_past").val(pacient.medical_past);
    $("#surgical_past").val(pacient.surgical_past);
    $("#allergy_past").val(pacient.allergy_past);
    $("#toxic_past").val(pacient.toxic_past);
    $("#traumatic_past").val(pacient.traumatic_past);
    $("#immunological_past").val(pacient.immunological_past);
    $("#civil_state").val(pacient.civil_state);
    // re-initialize material-select
    $('select').material_select();
}

function dataBindToView(pacient) {
    $("#doc_type").html(pacient.doc_type);
    $("#n_documento").html(pacient.n_documento);
    $("#full_name").html(pacient.full_name);
    $("#last_name").html(pacient.last_name);
    $("#gender").html(pacient.gender);
    $('#birthdate').html(pacient.birthdate);
    $("#scholar_level").html(pacient.scholar_level);
    $("#phone").html(pacient.phone);
    $("#address").html(pacient.address);
    $("#family_past").html(pacient.family_past);
    $("#medical_past").html(pacient.medical_past);
    $("#surgical_past").html(pacient.surgical_past);
    $("#allergy_past").html(pacient.allergy_past);
    $("#toxic_past").html(pacient.toxic_past);
    $("#traumatic_past").html(pacient.traumatic_past);
    $("#immunological_past").html(pacient.immunological_past);
    $("#civil_state").html(pacient.civil_state);
}

function cleanDataPacient(data) {
    optionsPacient = [];
    var ret = {};
    var key, value;
    for (var i = 0; i < data.length; i++) {
        key = data[i].n_documento + " " + data[i].full_name + " " + data[i].last_name;
        value = data[i].n_documento;
        optionsPacient[key] = value;
        ret[key] = null;
    }
    return ret;
}

function Pacient(json = null) {
    if (json !== null) {
        this.doc_type = json.doc_type;
        this.n_documento = json.n_documento;
        this.full_name = json.full_name;
        this.last_name = json.last_name;
        this.gender = json.gender;
        this.birthdate = json.birthdate;
        this.scholar_level = json.scholar_level;
        this.phone = json.phone;
        this.address = json.address;
        this.family_past = json.family_past;
        this.medical_past = json.medical_past;
        this.surgical_past = json.surgical_past;
        this.allergy_past = json.allergy_past;
        this.toxic_past = json.toxic_past;
        this.traumatic_past = json.traumatic_past;
        this.civil_state = json.civil_state;
        this.immunological_past = json.immunological_past;
        this.getInitials = function () {
            var FN = this.full_name.toUpperCase().split(" ")[0];
            var LN = this.last_name.toUpperCase().split(" ")[0];
            return FN.charAt(0) + "" + LN.charAt(0);
        };
    }
}