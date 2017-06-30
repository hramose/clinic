var PACIENT_VIEW = 101;
var PACIENTS_LIST_VIEW = 102;
var PACIENT_ADD = 103;
var PACIENT_EDIT = 104;

var CONSULT_VIEW = 201;
var CONSULT_ADD = 202;
var CONSULT_EDIT = 203;
var CONSULT_LIST_VIEW = 204;

var MAIN_PAGE = 301;

var optionsPacient = [];


$(document).ready(function () {
    Materialize.updateTextFields();

    $.get("navbar.html", null, function (data) {
        $("#navbar-container").append(data);
        $(".button-collapse").sideNav();

        $("#add_pacient_btn").click(function () {
            loadContent({page: "pacient_edit.html", type: PACIENT_ADD});
        });

        $(".list_pacient_btn").click(function () {
            loadContent({page: "pacients_list.html", type: PACIENTS_LIST_VIEW});
        });

        $("#look_pacient_btn").click(function () {
            var pacient = new Pacient(lookedPacients[$("#id_pacient").val()]);
            loadContent({page: "pacient.html", type: PACIENT_VIEW, params: pacient});
        });



        $(".consult_list_btn").click(function () {
            loadContent({page: "consult.html", type: CONSULT_VIEW});
        });
    });


    loadContent({page: "landing-page.html", type: MAIN_PAGE});


});

/**
 * 
 * @param {type} view {page:text, type:int, params:object}
 * @returns {undefined}
 */
function loadContent(view) {
    $.get(view.page, null, function (data) {
        $(".container").html(data);
        switch (view.type) {
            case PACIENT_VIEW:
                initPacientForm(view.params, true);
                break;
            case PACIENT_ADD:
            case PACIENT_EDIT:
                initPacientForm(view.params, false);
                break;
            case PACIENTS_LIST_VIEW:
                loadPacients();
                break;
            case CONSULT_VIEW:
                initConsultForm(view.params);
                break;
            case CONSULT_ADD:
            case CONSULT_EDIT:
                initConsultForm(view.params);
                break;
        }
    });
}
