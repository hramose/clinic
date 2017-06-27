$(document).ready(function () {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });
    $(".button-collapse").sideNav();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 80, // Creates a dropdown of 15 years to control year
        max: new Date()
    });
    $('ul.tabs').tabs();
});
