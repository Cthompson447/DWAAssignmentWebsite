//car was saved as a string, this gets us our car object back from localstorage.
const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));

//this is saved from index.html selections, used for calculation of total cost.
const differenceInDays = localStorage.getItem('differenceInDays');

//Render the summary table
function renderHireSummary() {
    const tableParent = document.getElementById('table-container');
    const table = document.createElement('table');

    table.appendChild(createTableHeader());
    table.appendChild(createTableBody());

    //make the table scrollable on smaller screens and center the text
    table.className = "responsive-table centered";

    tableParent.appendChild(table);
}

//Static table header generation with a small for loop to create our headers
function createTableHeader() {
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headerNames = ['Car', 'Day Rate', 'Days Hired', 'Total Cost'];

    for (var i = 0; i < headerNames.length; i++) {
        const cell = document.createElement('th');
        var cellText = headerNames[i];

        cell.innerHTML = cellText;
        headerRow.append(cell);
    }

    tableHeader.appendChild(headerRow);

    return tableHeader;
}

/*Rendering the dynamic content for the table, all of this data is gathered from localstorage when we save off user
 inputs throughout their journey*/
function createTableBody() {
    const tableBody = document.createElement('tbody');
    const tableRow = document.createElement('tr');

    const data = [selectedCar.make + " " + selectedCar.model, '&pound' + selectedCar.dailyRate, differenceInDays,
        '&pound' + differenceInDays * selectedCar.dailyRate];

    for (var i = 0; i < data.length; i++) {
        const cell = document.createElement('td');
        var cellContents = data[i];

        cell.innerHTML = cellContents;
        tableRow.append(cell)
    }

    tableBody.appendChild(tableRow);

    return tableBody;
}

//if we meet validation rules for personal details, next page!
function submitConfirm() {
    if (validateNames() &&  validateEmail() && validatePhone()) {
        localStorage.setItem('firstName', document.getElementById('firstName').value);
        window.location.href = ("hireSuccess.html");
    }
}


/*Name validation, very basic, upper and lowercase letters only*/
function validateNames() {
    const nameRegex = /^[0-9a-zA-Z]+$/;

    if (!document.getElementById('firstName').value.match(nameRegex)) {
        alert("Please enter valid first name");
        /*materialize handles focusing elements with "invalid" or "valid" classes, I'm using these to change element
        appearance when my validation constraints are not met*/
        document.getElementById('firstName').className = "invalid";
        return false;
    }
    document.getElementById('firstName').className = "valid";
    if (!document.getElementById('lastName').value.match(nameRegex)) {
        alert("Please enter valid last name");
        document.getElementById('lastName').className = "invalid";
        return false;
    }
    document.getElementById('lastName').className = "valid";
    return true;
}

/*phone validation using regex to check for presence of 11 digits*/
function validatePhone() {
    const phoneRegex = /^[0][1-9]\d{9}$|^[1-9]\d{9}/;

    if (!document.getElementById('phoneNumber').value.match(phoneRegex)) {
        alert("Please enter valid phone number");
        document.getElementById('phoneNumber').className = "invalid";
        return false;
    }
    document.getElementById('phoneNumber').className = "valid";
    return true;
}


/*email validation, using regex to check we have a string of letters numbers before @, then @ and text for domain
 followed by a .com or any other suffix*/
function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!document.getElementById('email').value.match(emailRegex)) {
        alert("Please enter valid email address");
        document.getElementById('email').className = "invalid";
        return false;
    }
    document.getElementById('email').className = "valid";
    return true;
}
