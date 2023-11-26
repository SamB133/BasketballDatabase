onload = function () {
    changeTableDropdown()
}

function changeTableDropdown() {
    document.getElementById("player").style.display = typeSelection.value == "player" ? "block" : "none"
    document.getElementById("match_").style.display = typeSelection.value == "match_" ? "block" : "none"
    document.getElementById("participatedIn").style.display = typeSelection.value == "participatedIn" ? "block" : "none"
    document.getElementById("playedIn").style.display = typeSelection.value == "playedIn" ? "block" : "none"
    document.getElementById("manager").style.display = typeSelection.value == "manager" ? "block" : "none"
    document.getElementById("searchButtons").style.display = typeSelection.value != "default" ? "block" : "none"
    document.getElementById("resultsWindow").style.display = "none"
    document.getElementById("noMatches").style.visibility = "hidden";
    document.getElementById("invalidID").style.visibility = "hidden";
}

function resetForm() {
    const queryForm = document.getElementById("queryForm")
    queryForm.reset()
    changeTableDropdown()
}

function clearForm() {
    const queryForm = document.getElementById("queryForm")
    let temp = document.getElementById("typeSelection").value
    queryForm.reset()
    document.getElementById("typeSelection").value = temp
}

function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear().toString().substr(-2);

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('-');
}

function validateID(typeSelection) {
    const inputs = Array.from(document.getElementById(typeSelection).children).filter(node => node.nodeName == "INPUT")
    const firstInput = inputs[0]
    if (firstInput.value === "" || (firstInput.value !== "" && !isNaN(firstInput.value))) {
        return true;
    }
    return false;
}

async function getQuerySubmission() {
    // Get the values from the form section according to the dropdown selection
    const typeSelection = document.getElementById("typeSelection").value
    if (!validateID(typeSelection)) {
        document.getElementById("invalidID").style.visibility = "visible";
        return;
    }
    document.getElementById("invalidID").style.visibility = "hidden";

    const inputs = Array.from(document.getElementById(typeSelection).children).filter(node => node.nodeName == "INPUT")
    const queryFormValues = {}
    let url = `/api/${typeSelection}`;

    for (let input of inputs) {
        if (input.value === "") {
            queryFormValues[input.name] = "*"
        } else {
            queryFormValues[input.name] = input.value
        }
    }

    let res = await fetch(url + '?' + new URLSearchParams(queryFormValues))
    let data = await res.json()
    resetForm()

    if (data && Array.isArray(data)) {
        displayQueryResults(data, typeSelection);
    } else {
        console.error('No data received or data is not in expected format');
    }
}

function displayQueryResults(data, typeSelection) {
    const tableWindow = document.getElementById("tableWindow");
    tableWindow.innerHTML = ''; // Clear previous results

    if (Object.keys(data).length === 0) {
        document.getElementById("noMatches").style.visibility = "visible";
    } else {
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let headerRow = document.createElement("tr");

        // Assuming first row has headers
        Object.keys(data[0]).forEach(header => {
            let th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body of the table
        data.forEach(row => {
            let tr = document.createElement("tr");
            Object.values(row).forEach((value, index) => {
                let td = document.createElement("td");
                // Format the date if it's in the expected column index
                // Assuming the date is in the fourth column (index 3)
                // Only works on tables Player and Manager
                if ((index === 3 && typeSelection === "player") || (index === 4 && typeSelection === "manager")) {
                    td.textContent = formatDate(value);
                } else {
                    td.textContent = value;
                }
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        tableWindow.appendChild(table);
        document.getElementById("resultsWindow").style.display = "block";
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        getQuerySubmission()
    } else if (event.code === "Delete") {
        clearForm()
    }
}, true)
