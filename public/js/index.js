var PACIENT_VIEW = 101;
var PACIENTS_LIST_VIEW = 102;
var PACIENT_ADD = 103;
var PACIENT_EDIT = 104;

var CONSULT_VIEW = 201;
var CONSULT_ADD = 202;
var CONSULT_EDIT = 203;
var CONSULT_LIST_VIEW = 204;

var MAIN_PAGE = 301;

$(document).ready(function () {
    Materialize.updateTextFields();

    $.get("navbar.html", null, function (data) {
        $("#navbar-container").append(data);
        $(".button-collapse").sideNav();
    });


//    loadContent({page: "landing-page.html", type: MAIN_PAGE});
//    loadContent({page: "consult.html", type: CONSULT_VIEW});
    loadContent({page: "pacients_list.html", type: PACIENTS_LIST_VIEW});

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
            case PACIENT_ADD:
            case PACIENT_EDIT:
                initPacientForm(view.params);
                break;
            case PACIENTS_LIST_VIEW:
                loadPacients();
                break;
            case CONSULT_ADD:
            case CONSULT_EDIT:
                initConsultForm(view.params);
                break;
        }
    });
}