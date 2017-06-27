function initPacient() {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 80, // Creates a dropdown of 15 years to control year
        max: new Date()
    });
    $('ul.tabs').tabs();
    $.get("/pacients", null, function (data) {
        console.log(data);
        $("#pacient_list").append(inflateList(data));
    });
    $("#create_pacient").click(function () {
        dataBindFromForm();
    });

    $("#gender").change(function () {
        if ($("#gender").val() === 'Masculino') {
            $(".woman_past").addClass("disabled");
        } else {
            $(".woman_past").removeClass("disabled");
        }
    });
}


function dataBindFromForm() {
    var $inputB = $('#birthdate').pickadate();
    var $inputFUR = $('#birthdate').pickadate();

// Use the picker object directly.
    var pickerB = $inputB.pickadate('picker');
    var pickerFUR = $inputFUR.pickadate('picker');
    var pacient = {
        doc_type: $("#doc_type").val(),
        n_documento: $("#n_documento").val(),
        full_name: $("#full_name").val(),
        last_name: $("#last_name").val(),
        gender: $("#gender").val(),
        birthdate: pickerB.get('select', 'yyyy-mm-dd'),
        scholar_level: $("#scholar_level").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        family_past: $("#family_past").val(),
        medical_past: $("#medical_past").val(),
        surgical_past: $("#surgical_past").val(),
        allergy_past: $("#allergy_past").val(),
        toxic_past: $("#toxic_past").val(),
        traumatic_past: $("#traumatic_past").val(),
        immunological_past: $("#immunological_past").val(),
        menarquia: $("#menarquia").val(),
        cycles: $("#cycles").val(),
        gestacion: $("#gestacion").val(),
        partos: $("#partos").val(),
        abortos: $("#abortos").val(),
        ectopicos: $("#ectopicos").val(),
        cesarias: $("#cesarias").val(),
        fur: pickerFUR.get('select', 'yyyy-mm-dd'),
        pf: $("#pf").val()
    };
    console.log("binded object");
    console.log(pacient);
    $.post("/pacient", pacient, function (data) {
        console.log(data);
    });
}

function inflateList(data) {
    var container = $("#pacient_list");
    container.addClass("row");
    if (data.length === 0) {
        container.append("No hay pacientes registrados por el momento");
        return container;
    }
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        container.append(inflate(data[i]));
    }
    return container;
}

function inflate(pacient) {
    var card = $("<div>");
    card.addClass("card-panel pacient-card");
    card.addClass("col s12 m6 l3");
    card.append(pacient.full_name);
    card.append(pacient.last_name);
    card.append(pacient.n_documento);
    return card;
}