function inflatePacientList(pacientList) {
    var container = $("#pacient_list");
    container.addClass("row");
    if (pacientList.length === 0) {
        container.append("No hay pacientes registrados por el momento");
        return container;
    }
    for (var i = 0; i < pacientList.length; i++) {
        console.log(pacientList[i]);
        var pacient = new Pacient(pacientList[i]);
        container.append(inflatePacientCard(pacient));
    }
    return container;
}

function inflatePacientCard(pacient) {
    var wrapper = $("<div class='col s12 m3'>");
    var card = $("<div class='card pacient_card'>");
    var cardImg = inflatePacientCardImage(pacient);
    var cardContent = inflatePacientCardContent(pacient);
    var cardReveal = inflatePacientCardReveal(pacient);

    card.append(cardImg);
    card.append(cardContent);
    card.append(cardReveal);
    wrapper.append(card);
    return wrapper;
}


function inflatePacientCardReveal(pacient) {
    var div = $("<div class='card-reveal'>");
    var span = $("<span class='card-title grey-text text-darken-4'>");
    var p = $("<p>");

    span.append(pacient.full_name + " " + pacient.last_name);
    span.append("<i class='material-icons right'>close</i>");

    p.append("<address>" + pacient.address + "</address><br > Phone: " + pacient.phone);

    div.append(span);
    div.append(p);
    return div;
}

function inflatePacientCardContent(pacient) {
    var content = $("<div class='card-content'>");
    var cardTitle = $("<span class='truncate card-title activator grey-text text-darken-4'>");
    var editBtn = $("<a class='btn-floating btn-small waves-effect waves-light blue'>");
    editBtn.append("<i class='material-icons'>edit</i>");

    $(editBtn).click(function () {
        $('#modalEdit').modal('open');
    });

    var deleteBtn = $("<a class='btn-floating btn-small waves-effect waves-light red'>");
    deleteBtn.append("<i class='material-icons'>delete</i>");

    $(deleteBtn).click(function () {
        $('#modalDelete').modal('open');
    });


    var detailsBtn = $("<a class='btn-floating btn-small waves-effect waves-light green'>");
    detailsBtn.append("<i class='material-icons'>launch</i>");

    $(detailsBtn).click(function () {
        loadContent({page: "pacient.html", type: PACIENT_VIEW, params: pacient});
    });


    cardTitle.append(pacient.full_name + " " + pacient.last_name);
    cardTitle.append("<i class='material-icons right'>more_vert</i>");

    content.append(cardTitle);
    var table=$("<table class='center'>");
    var row=$("<tr>");
    row.append($("<td>").append(editBtn));
    row.append($("<td>").append(detailsBtn));
    row.append($("<td>").append(deleteBtn));
    table.append(row);
    content.append(table);
    return content;
}

function inflatePacientCardImage(pacient) {
    var div = $("<div  class='card-image waves-effect waves-block waves-light'>");
    var activator = $("<div style='height:150px;' class='valign-wrapper activator center red darken-1 white-text'>");
    var title = $("<h4 class='pacient_card_initials'>");
    title.append(pacient.getInitials());
    activator.append(title);
    div.append(activator);
    return div;
}