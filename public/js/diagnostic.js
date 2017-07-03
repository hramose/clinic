function cleanDiagnosticData(data) {
//    console.log(data);
    options = [];
    var ret = {};
    var key, value;
    for (var i = 0; i < data.length; i++) {
        key = data[i].code + " " + data[i].description;
        value = data[i].code;
        options[key] = value;
        ret[key] = null;
    }
//    console.log(ret);
    return ret;
}

function Diagnostic(json){
    if (json && json !== null) {
        this.code=json.code;
        this.description=json.description;
    }
}