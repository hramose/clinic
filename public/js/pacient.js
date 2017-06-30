function initPacientForm(pacient, toView) {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 80, // Creates a dropdown of 15 years to control year
        max: new Date()
    });
    $('ul.tabs').tabs();

    $("#create_pacient").click(function () {
        createPacient();
    });

    $("#gender").change(function () {
        if ($("#gender").val() === 'Masculino') {
            $(".woman_past").addClass("disabled");
        } else {
            $(".woman_past").removeClass("disabled");
        }
    });
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('select').material_select();
    if (pacient && pacient !== null) {
        if (toView) {
            dataBindToView(pacient);
        } else {
            dataBindToForm(pacient);
        }
    }
}


function loadPacients() {
    addPacientListener();
    $.get("/pacients", null, function (data) {
        console.log(data);
        $("#pacient_list").append(inflatePacientList(data));
    });
    
//     $("#look_pacient_btn").click(function () {
//        var pacient = new Pacient(optionsPacient[$("#id_pacient").val()]);
//        loadContent({page: "pacient.html", type: PACIENT_VIEW, params: pacient});
//    });
    
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
}

function createPacient() {
    var pacient = new Pacient();
    dataBindFromForm(pacient);
    console.log(pacient);
    $.post("/pacient", pacient, function (data) {
        alert(data);
        //TODO: show modal
        loadContent({page: "pacients_list.html", type: PACIENTS_LIST_VIEW});
    });
}

function deletePacient(pacient) {
    $.ajax({
        url: '/pacient/' + pacient.n_documento,
        type: 'DELETE',
        success: function (result) {
            // Do something with the result
            alert(result);
        }
    });
}

function editPacient(pacient) {
    $.ajax({
        url: '/pacient/' + pacient.n_documento,
        type: 'PUT',
        data: pacient,
        success: function (result) {
            // Do something with the result
            alert(result);
        }
    });
}


function dataBindFromForm(pacient) {
    var $inputB = $('#birthdate').pickadate();
    var $inputFUR = $('#fur').pickadate();

// Use the picker object directly.
    var pickerB = $inputB.pickadate('picker');
    var pickerFUR = $inputFUR.pickadate('picker');

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
    pacient.menarquia = $("#menarquia").val();
    pacient.cycles = $("#cycles").val();
    pacient.gestacion = $("#gestacion").val();
    pacient.partos = $("#partos").val();
    pacient.abortos = $("#abortos").val();
    pacient.ectopicos = $("#ectopicos").val();
    pacient.cesarias = $("#cesarias").val();
    pacient.fur = pickerFUR.get('select', 'yyyy-mm-dd');
    pacient.pf = $("#pf").val();
}

function dataBindToForm(pacient) {
    var $inputB = $('#birthdate').pickadate();
    var $inputFUR = $('#fur').pickadate();

// Use the picker object directly.
    var pickerB = $inputB.pickadate('picker');
    var pickerFUR = $inputFUR.pickadate('picker');

    $("#doc_type").val(pacient.doc_type);
    $("#n_documento").val(pacient.n_documento);
    $("#full_name").val(pacient.full_name);
    $("#last_name").val(pacient.last_name);
    $("#gender").val(pacient.gender);
    pickerB.set('select', pacient.birthdate);
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
    if (pacient.gender === "Femenino") {
        $("#menarquia").val(pacient.menarquia);
        $("#cycles").val(pacient.cycles);
        $("#gestacion").val(pacient.gestacion);
        $("#partos").val(pacient.partos);
        $("#abortos").val(pacient.abortos);
        $("#ectopicos").val(pacient.ectopicos);
        $("#cesarias").val(pacient.cesarias);
        pickerFUR.set('select', pacient.fur);
        $("#pf").val(pacient.pf);
    }
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
    if (pacient.gender === "Femenino") {
        $("#menarquia").html(pacient.menarquia);
        $("#cycles").html(pacient.cycles);
        $("#gestacion").html(pacient.gestacion);
        $("#partos").html(pacient.partos);
        $("#abortos").html(pacient.abortos);
        $("#ectopicos").html(pacient.ectopicos);
        $("#cesarias").html(pacient.cesarias);
        $("#fur").html(pacient.fur);
        $("#pf").html(pacient.pf);
    }
}

function Pacient(json) {
    if (json && json !== null) {
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
        this.immunological_past = json.immunological_past;
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
    this.getInitials = function () {
        if (typeof (this.full_name) != "string"
                || typeof (this.last_name) != "string") {
            return "";
        }
        var FN = this.full_name.toUpperCase().split(" ")[0];
        var LN = this.last_name.toUpperCase().split(" ")[0];
        return FN.charAt(0) + "" + LN.charAt(0);
    };
}