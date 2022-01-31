document.getElementById("add-button").addEventListener("click", addRow);
document.getElementById("mean-button").addEventListener("click", meanResult);
document.getElementById("weighted-button").addEventListener("click", weightedResult);

function addRow() {

    var table = document.getElementById("table");
    var rowCount = table.rows.length
    var row = table.insertRow(rowCount);

    var weight = "a" + rowCount + "-w";
    var grade1 = "a" + rowCount + "-g1";
    var grade2 = "a" + rowCount + "-g2";
    var percent = "a" + rowCount + "-p"
    var restriction = "min=" + "0" + " oninput=" + "validity" + ".valid||(value='');";

    row.insertCell(0).innerHTML = 'Activity ' + rowCount;
    row.insertCell(1).innerHTML = 'A' + rowCount;
    row.insertCell(2).innerHTML = '<input id=' + weight + ' type="number" ' + restriction + '></input>';
    row.insertCell(3).innerHTML = '<input id=' + grade1 + ' type="number" ' + restriction + ' onkeyup="percent()"></input> ' +
        '/' + ' <input  id=' + grade2 + ' type="number" ' + restriction + ' onkeyup="percent()"></input >';
    row.insertCell(4).id = percent;
}

function percent() {

    var table = document.getElementById("table");
    var rowCount = table.rows.length;

    for (var i = 1; i <= rowCount; i++) {
        var id_grade1 = "a" + i + "-g1";
        var id_grade2 = "a" + i + "-g2";
        var grade1 = document.getElementById(id_grade1).value;
        var grade2 = document.getElementById(id_grade2).value;
        var percent = "a" + i + "-p"

        if (grade1 != "" && grade2 != "") {
            var totalPercent = Math.round(((grade1 / grade2 * 100) + Number.EPSILON) * 100) / 100;
            if (totalPercent > 100) alert("Activity " + i + " total percentage is over 100%, please check your inputted grades as this will effect weighted and mean total.");
            document.getElementById(percent).innerHTML = totalPercent + "%";
        } else document.getElementById(percent).innerHTML = "";
    }
}

function weightedResult() {
    var table = document.getElementById("table");
    var rowCount = table.rows.length;

    var weightedGrade = 0;
    var totalWeight = 0;

    for (var i = 1; i <= rowCount; i++) {
        var id_grade1 = "a" + i + "-g1";
        var id_grade2 = "a" + i + "-g2";
        var id_weight = "a" + i + "-w";
        var grade1 = document.getElementById(id_grade1).value;
        var grade2 = document.getElementById(id_grade2).value;
        var weight = document.getElementById(id_weight).value;

        if (grade1 != "" && grade2 != "" && weight != "") {
                weightedGrade += ((grade1 / grade2) * weight);
                totalWeight += parseInt(weight);
                document.getElementById("total-result").innerHTML = Math.round((((weightedGrade / totalWeight) * 100) + Number.EPSILON) * 100) / 100 + "%";
        }

        if (grade1 != "" && grade2 != "" && weight == "") {
            alert("Activity " + i + " will not be added into the weighted result as their is no weight assigned to it.");
        }

        if ((grade1 == "" && grade2 != "" && weight != "") || (grade1 != "" && grade2 == "" && weight != "")) {
            alert("Activity " + i + " will not be added into the weighted result as their is a missing grade.");
        }

        if (weight != "" && (grade1 == "" && grade2 == "")) {
            alert("Activity " + i + " will not be added into the weighted result as their are missing grades.");
        }
    }
}

function meanResult() {
    var table = document.getElementById("table");
    var rowCount = table.rows.length;

    var totalPercentage = 0;
    var numberOfGrades = 0;

    for (var i = 1; i <= rowCount; i++) {
        var id_grade1 = "a" + i + "-g1";
        var id_grade2 = "a" + i + "-g2";
        var grade1 = document.getElementById(id_grade1).value;
        var grade2 = document.getElementById(id_grade2).value;

        if (grade1 != "" && grade2 != "") {
                totalPercentage += (grade1 / grade2 * 100);
                numberOfGrades += 1;
                document.getElementById("total-result").innerHTML = Math.round(((totalPercentage / numberOfGrades) + Number.EPSILON) * 100) / 100 + "%";
        }

        if ((grade1 != "" && grade2 == "") || (grade1 == "" && grade2 != "")) {
            alert("Activity " + i + " will not be added into the mean result as their is a missing grade.");
        }
    }
}

