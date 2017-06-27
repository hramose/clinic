function initConsult() {
    $('input.autocomplete').autocomplete({
        data: {
            "Apple": null,
            "Microsoft": null,
            "Google": 'https://placehold.it/250x250'
        },
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function (val) {
            // Callback function when value is autcompleted.
        },
        minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
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
        id_pacient: $("#id_pacient").val(),
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
//    $.post("/consult", consult, function (data) {
//        console.log(data);
//    });
}