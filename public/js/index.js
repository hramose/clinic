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

var navHistory = [];

$(document).ready(function () {
    Materialize.updateTextFields();
    $.get("navbar.html", null, function (data) {
        $("#navbar-container").append(data);
        $(".button-collapse").sideNav();
    });
    loadContent({page: "landing-page.html", type: MAIN_PAGE});
});

/**
 * 
 * @param {type} view {page:text, type:int, params:object}
 * @returns {undefined}
 */
function loadContent(view) {
    navHistory.push(view);
    refreshContent(view);
}

function refreshContent(view) {
    $.get(view.page, null, function (data) {
        $(".container").html(data);
        switch (view.type) {
            case MAIN_PAGE:
                addLandingListeners();
                break;
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
                bindConsultToView(view.params);
                break;
            case CONSULT_LIST_VIEW:
                loadConsults();
                break;
            case CONSULT_ADD:
            case CONSULT_EDIT:
                initConsultForm(view.params);
                break;
            default:
                break;
        }
    });
    $("#return-options").html(inflateHistory(navHistory));
}

function addLandingListeners() {
    $("#add_pacient_btn").click(function () {
        loadContent({page: "pacient_form.html", type: PACIENT_ADD});
    });

    $(".list_pacient_btn").click(function () {
        loadContent({page: "pacients_list.html", type: PACIENTS_LIST_VIEW});
    });

    $("#add_consult_btn").click(function () {
        loadContent({page: "consult_form.html", type: CONSULT_ADD});
    });

    $(".list_consult_btn").click(function () {
        loadContent({page: "consults_list.html", type: CONSULT_LIST_VIEW});
    });

    $(".history_btn").click(function () {
        loadContent({page: "consults_list.html", type: CONSULT_LIST_VIEW});
    });

    $("#backBtn").click(function () {
        if (navHistory.length < 2) {
            //MUST BE landing-page
            return;
        }
        navHistory.pop();
        refreshContent(navHistory[navHistory.length - 1]);
    });

}

function getViewTypeString(type) {
    switch (type) {
        case MAIN_PAGE:
            return "Inicio";
        case PACIENT_VIEW:
            return "Paciente";
        case PACIENT_ADD:
            return "Nuevo Paciente";
        case PACIENT_EDIT:
            return "Editar Paciente";
        case PACIENTS_LIST_VIEW:
            return "Listar Pacientes";
        case CONSULT_VIEW:
            return "Consulta";
        case CONSULT_LIST_VIEW:
            return "Consultas";
        case CONSULT_ADD:
            return "Nueva Consulta";
        case CONSULT_EDIT:
            return "Editar Consulta";
        default:
            return "";
    }
}

function displayMessage(message) {
    $("modal-message").modal('open');
    $("#message-content").html(message);
}