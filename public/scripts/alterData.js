onload = function () {
    changeTable()
}

function changeTask() {
    // Input fields
    // document.getElementById("playerID").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("playerIDPI").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("matchNum").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("teamID").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("Mnum").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("managerID").style.display = taskSelector.value == "POST" ? "none" : "block"

    // Label fields
    // document.getElementById("PID").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("PIDPI").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("MMN").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("PIMN").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("TTID").style.display = taskSelector.value == "POST" ? "none" : "block"
    // document.getElementById("MMID").style.display = taskSelector.value == "POST" ? "none" : "block"

    document.getElementById("submitted").style.visibility = "hidden";
    document.getElementById("invalidID").style.visibility = "hidden";

}

function changeTable() {
    // Only show the div for the selected dropdown
    document.getElementById("player").style.display = tableSelector.value == "player" ? "block" : "none"
    document.getElementById("match_").style.display = tableSelector.value == "match_" ? "block" : "none"
    document.getElementById("participatedIn").style.display = tableSelector.value == "participatedIn" ? "block" : "none"
    document.getElementById("playedIn").style.display = tableSelector.value == "playedIn" ? "block" : "none"
    document.getElementById("team").style.display = tableSelector.value == "team" ? "block" : "none"
    document.getElementById("manager").style.display = tableSelector.value == "manager" ? "block" : "none"
    document.getElementById("submitButtons").style.display = tableSelector.value != "default" && taskSelector.value != "default" ? "block" : "none"
}

function resetForm() {
    const alteringForm = document.getElementById("alteringForm")
    alteringForm.reset()
    changeTable("default")
}

function clearForm() {
    const alteringForm = document.getElementById("alteringForm")
    let temp = document.getElementById("taskSelector").value
    let temp2 = document.getElementById("tableSelector").value
    alteringForm.reset()
    document.getElementById("taskSelector").value = temp
    document.getElementById("tableSelector").value = temp2
}

function validateID(tableSelector) {
    const inputs = Array.from(document.getElementById(tableSelector).children).filter(node => node.nodeName == "INPUT")
    const firstInput = inputs[0]
    if (firstInput.value !== "") {
        if (!isNaN(firstInput.value)) {
            return true;
        }
    }
    return false;
}

async function getSubmission() {
    // Get the values from the form section according to the dropdown selection
    const tableSelector = document.getElementById("tableSelector").value
    if (!validateID(tableSelector)) {
        document.getElementById("invalidID").style.visibility = "visible";
        return;
    }
    document.getElementById("invalidID").style.visibility = "hidden";

    const taskSelector = document.getElementById("taskSelector").value
    const inputs = Array.from(document.getElementById(tableSelector).children).filter(node => node.nodeName == "INPUT")
    const alteringFormValues = {}
    let url = `/api/${tableSelector}`;

    for (let input of inputs) {
        if (input.value === "") {
            alteringFormValues[input.name] = "*"
        } else {
            alteringFormValues[input.name] = input.value
        }
    }

    let res = await fetch(url + '?' + new URLSearchParams(alteringFormValues), {
        method: taskSelector
    })
    let data = await res.json()
    resetForm()
    document.getElementById("submitted").style.visibility = "visible";
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        getSubmission()
    } else if (event.code === "Delete") {
        clearForm()
    }
}, true)