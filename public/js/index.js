var PACIENT_VIEW = 101;
var CONSULT_VIEW = 201;

$(document).ready(function () {
    Materialize.updateTextFields();

    $.get("navbar.html", null, function (data) {
        $("#navbar-container").append(data);
        $(".button-collapse").sideNav();
    });

    loadContent({page: "consult.html", type: CONSULT_VIEW});
//    loadContent({page: "pacient.html", type: PACIENT_VIEW});

});

/**
 * 
 * @param {type} view {page:text, type:int}
 * @returns {undefined}
 */
function loadContent(view) {
    $.get(view.page, null, function (data) {
        $(".container").append(data);
        switch (view.type) {
            case PACIENT_VIEW:
                initPacient();
                break;
            case CONSULT_VIEW:
                initConsult();
                break;
        }
    });
}