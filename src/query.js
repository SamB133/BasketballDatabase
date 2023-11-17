
// global constants
const playerColCount = 6
const participatedInColCount = 7
const matchColCount = 5
const playedInColCount = 3
const managerColCount = 4
   
const playerStartIndex = 1
const participatedInStartIndex = playerColCount + 1
const matchStartIndex = participatedInStartIndex + participatedInColCount
const playedInStartIndex = matchStartIndex + matchColCount
const managerStartIndex = playedInStartIndex + playedInColCount

const colNames = [
    // player
    "playerID", 
    "fName", 
    "lName", 
    "birthday", 
    "position", 
    "tName", 

    // participatedIn
    "playerID", 
    "matchNum", 
    "blocks", 
    "assists", 
    "minutesPlayed", 
    "pointsScored", 
    "passesMade", 

    // match
    "matchNum", 
    "matchTime", 
    "homeScore", 
    "awayScore", 
    "location", 

    // playedIn
    "Mnum", 
    "homeTeam", 
    "awayTeam",

    // manager
    "tName", 
    "fName", 
    "lName", 
    "birthday"
]

onload = function () {
    changeTableDropdown()
}

function changeTableDropdown() {
  document.getElementById("playerDropdown").style.display = typeSelection.value == "playerDropdown" ? "block" : "none"
  document.getElementById("matchDropdown").style.display = typeSelection.value == "matchDropdown" ? "block" : "none"
  document.getElementById("participatedInDropdown").style.display = typeSelection.value == "participatedInDropdown" ? "block" : "none"
  document.getElementById("playedInDropdown").style.display = typeSelection.value == "playedInDropdown" ? "block" : "none"
  document.getElementById("managerDropdown").style.display = typeSelection.value == "managerDropdown" ? "block" : "none"
} 

function showAlert() {
    alert("Query Sent")
    const queryForm = document.getElementById("queryForm")
    queryForm.reset()
    changeTableDropdown("default")
}

function getQuerySubmission() {
    // Get the values from the form section according to the dropdown selection
    const typeSelection = document.getElementById("typeSelection").value
    const queryForm = document.getElementById("queryForm")
    const queryFormElements = queryForm.elements
    const queryFormValues = []
    let tableColCount = 0
    let enteredValCount = 0
    let tableSelection = ""
    if (typeSelection == "playerDropdown") {
        tableSelection = "player"
        tableStartIndex = playerStartIndex
        tableColCount = playerColCount
        for (let i = tableStartIndex; i < tableStartIndex + tableColCount; i++) {
            if (queryFormElements[i].value === "") {
                queryFormValues[i] = ""
            } else {
                queryFormValues[i] = queryFormElements[i].value
                enteredValCount++
            }
        }
    } else if (typeSelection == "participatedInDropdown") {
        tableSelection = "participatedIn"
        tableStartIndex = participatedInStartIndex
        tableColCount = participatedInColCount
        for (let i = tableStartIndex; i <= tableStartIndex + tableColCount; i++) {
            if (queryFormElements[i].value === "") {
                queryFormValues[i] = ""
            } else {
                queryFormValues[i] = queryFormElements[i].value
                enteredValCount++
            }
        }
    } else if (typeSelection == "matchDropdown") {
        tableSelection = "match"
        tableStartIndex = matchStartIndex
        tableColCount = matchColCount
        for (let i = tableStartIndex; i < tableStartIndex + tableColCount; i++) {
            if (queryFormElements[i].value === "") {
                queryFormValues[i] = ""
            } else {
                queryFormValues[i] = queryFormElements[i].value
                enteredValCount++
            }
        }
    } else if (typeSelection == "playedInDropdown") {
        tableSelection = "playedIn"
        tableStartIndex = playedInStartIndex
        tableColCount = playedInColCount
        for (let i = tableStartIndex; i < tableStartIndex + tableColCount; i++) {
            if (queryFormElements[i].value === "") {
                queryFormValues[i] = ""
            } else {
                queryFormValues[i] = queryFormElements[i].value
                enteredValCount++
            }
        }
    } else if (typeSelection == "managerDropdown") {
        tableSelection = "manager"
        tableStartIndex = managerStartIndex
        tableColCount = managerColCount
        for (let i = tableStartIndex; i < tableStartIndex + tableColCount; i++) {
            if (queryFormElements[i].value === "") {
                queryFormValues[i] = ""
            } else {
                queryFormValues[i] = queryFormElements[i].value
                enteredValCount++
            }
        }
    }
    conductQuery(tableSelection, tableStartIndex, tableColCount, queryFormValues, enteredValCount)
}

function conductQuery(tableSelection, tableStartIndex, tableColCount, queryFormValues, enteredValCount) {

    // create a new MySQL connection
    const conn = createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'project4347'
    });
  
    // establish connection to database
    conn.connect(function (error) {
        if (error) {
            console.error('Error connecting to MySQL database:', error);
        }
        else {
            // create query string
            let queryString = "SELECT "
            if (enteredValCount != 0) {
                let temp = enteredValCount
                for (let i = tableStartIndex; i < tableStartIndex + tableColCount; i++) {
                    if (queryFormValues[i] != "") {
                        queryString += colNames[i - 1]
                        temp--
                        if (temp > 0)
                            queryString += ", "
                    }
                }
            }
            else {
                queryString += "*"
            }
            if (tableSelection != "")
                queryString += " FROM " + tableSelection
            if (enteredValCount != 0) {
                let temp = enteredValCount
                queryString += " WHERE "
                for (let i = tableStartIndex; i < tableStartIndex + tableColCount; i++) {
                    if (queryFormValues[i] != "") {
                        queryString += colNames[i - 1] + " = " + queryFormValues[i]
                        temp--
                        if (temp > 0)
                            queryString += " AND "
                    }
                }
            }
        }
        conn.query(queryString, function (error, result, fields) {
            if (error) throw error;
            console.log(result);
        });
    });}