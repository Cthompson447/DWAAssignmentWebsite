function submitCard() {
    if(validateAge() && validateDateTimeFilledIn() && validateDateRange()
     && validateTimeRange() && validateSameDay()){
        setDifferenceInDays();
        setAgeGroup();
        setSelectedDatesAndTimes();
        window.location.href = ("cars.html");
    }
}

//Validation function to ensure an age group has been selected
function validateAge() {
    if (!document.getElementById('under25').checked &&
        !document.getElementById('over25').checked) {
        alert('You must select an age group!');
        return false;
    } else {
        return true;
    }
}

//Short validation function to ensure date to is not before date from
function validateDateRange() {
    var dateFrom = document.getElementById('dateFrom').value;
    var dateTo = document.getElementById('dateTo').value;

    if (dateTo < dateFrom) {
        alert('Date To must be after Date From');
        document.getElementById('dateTo').focus();
        return false;
    } else {
        return true;
    }

}

//Validation to make sure date and times have been filled in
function validateDateTimeFilledIn() {
    var dateFrom = document.getElementById('dateFrom');
    var timeFrom = document.getElementById('timeFrom');

    var dateTo = document.getElementById('dateTo');
    var timeTo = document.getElementById('timeTo');

    if (dateFrom.value && dateTo.value && timeFrom.value && timeTo.value) {
        return true;
    } else {
        if (!dateFrom.value) {
            dateFrom.focus();
        } else if (!timeFrom.value) {
            timeFrom.focus();
        } else if (!dateTo.value) {
            dateTo.focus()
        } else if (!timeTo.value) {
            timeTo.focus();
        }
        alert('Please ensure all date and time values have been filled in.');
        return false
    }
}

//Validation to make sure selected time is within opening hours
function validateTimeRange() {
    var timeFrom = document.getElementById('timeFrom');
    var timeTo = document.getElementById('timeTo');

    if (timeFrom.value < '09:00' || timeFrom.value > '17:00') {
        timeFrom.focus();
        alert('Please enter a time from value between 9am and 5pm.');
        return false;
    } else if (timeTo.value < '09:00' || timeTo.value > '17:00') {
        timeTo.focus();
        alert('Please enter a time to value  between 9am and 5pm.');
        return false;
    } else {
        return true;
    }
}

//If same day is chosen for rental, ensure time To isn't before time from
function validateSameDay() {
    if((document.getElementById('dateFrom').value === document.getElementById('dateTo').value)
    && (document.getElementById('timeTo').value < document.getElementById('timeFrom').value)){
        alert('If hiring on same day, time to cannot be before time from');
        return false;
    } else {
        return true;
    }
}

/*Further on in user journey, total days will be used to calculate a total rental price. We'll work that out on
submission of date card and save that off for later use*/
function setDifferenceInDays() {
    const dateFrom = new Date(document.getElementById('dateFrom').value);
    const dateTo = new Date(document.getElementById('dateTo').value);

    const differenceInDays = Math.abs((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24));

    localStorage.setItem('differenceInDays', differenceInDays);

}

/*Age group is going to be a factor in displaying what cars we show for a user. Saving this off to localstorage
* for later use also */
function setAgeGroup() {
    var isOver25;

    if (document.getElementById('under25').checked){
        isOver25 = false;
    } else {
        isOver25 = true;
    }

    localStorage.setItem('isOver25', isOver25);
}

function setSelectedDatesAndTimes() {
    localStorage.setItem('dateFrom',document.getElementById('dateFrom').value);
    localStorage.setItem('timeFrom', document.getElementById('timeFrom').value);

    localStorage.setItem('dateTo', document.getElementById('dateTo').value);
    localStorage.setItem('timeTo',  document.getElementById('timeTo').value);

}



