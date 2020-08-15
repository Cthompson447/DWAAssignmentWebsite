//car was saved as a string, this gets us our car object back from localstorage.
const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));

//dates and times picked for car hire
const dateFrom = localStorage.getItem('dateFrom');
const timeFrom = localStorage.getItem('timeFrom');

const dateTo = localStorage.getItem('dateTo');
const timeTo = localStorage.getItem('timeTo');

const firstName = localStorage.getItem('firstName');

function renderHireContent() {
    const contentParent = document.getElementById('success-content');

    contentParent.appendChild(buildHireMessage());
    contentParent.appendChild(buildSlider());
    initSlider();

}


/*Building a dynamic message to be displayed to the user, this uses various values from localstorage gathered earlier
in user's journey*/
function buildHireMessage() {
    const userMessage = document.createElement('p');

    userMessage.innerHTML = firstName + ", your hire has been confirmed! Your " + selectedCar.make + " "
        + selectedCar.model + " is ready to collect at " + timeFrom + " on " + dateFrom + ". It must be returned at " +
        timeTo + " on " + dateTo + ".";

    return userMessage;
}

function buildSlider() {
    const slider = document.createElement('div');
    const sliderList = document.createElement('ul');

    for(var i=0; i<selectedCar.images.length; i++){
        const listItem = document.createElement('li');
        const image = document.createElement('img');
        const br = document.createElement('br');

        image.src = selectedCar.images[i];
        listItem.appendChild(image);

        sliderList.appendChild(listItem);
    }
    sliderList.className='slides';
    sliderList.height =500;

    slider.className='slider';
    slider.appendChild(sliderList);

    return slider;

}

function initSlider() {
        var elems = document.querySelectorAll('.slider');
        var instances = M.Slider.init(elems, {height: 600, indicators: false});
}
