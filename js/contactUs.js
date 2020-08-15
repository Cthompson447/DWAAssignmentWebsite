//same as validation in confirmCarHire.js
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

//simpler validation than that used in confirmCarHire.js, just validating 1 name here
function validateName() {
    const nameRegex = /^[0-9a-zA-Z]+$/;

    if (!document.getElementById('name').value.match(nameRegex)) {
        alert("Please enter valid name");
        document.getElementById('name').className = "invalid";
        return false;
    }
    document.getElementById('name').className = "valid";
    return true;
}

function validateTextInput() {
    if (document.getElementById('yourMessage').value === ""){
        alert("Please enter a message");
        document.getElementById('yourMessage').className = "invalid";
        return false;
    }
    return true;

}

function submitContactUs() {
    if(validateEmail() && validateName() && validateTextInput()){
        alert("Message Sent!");
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('yourMessage').value = "";
    }
}
