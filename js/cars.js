//declaring cars variable to assign json object to
var cars;
const isOver25 = localStorage.getItem('isOver25');

//Using jquery to parse local json file into a javascript object.
$.getJSON("json/cars.json", function (data) {
    cars = data;
});

//for loop, this will render each json object as it's own car.
function renderCars() {
    for (var i = 0; i < cars.cars.length; i++) {
        renderCards(cars.cars[i]);
    }
}

// attach our cards to html parent element with cardAnchor id.
function renderCards(car) {
    const cardAnchor = document.getElementById('cardAnchor');

    /*If user under 25, render cars available for under 25 hire. If user is over 25, render cars that are unavailable
    for those under 25.*/
    if(car.isAvailableForUnder25Hire){
        cardAnchor.append(renderSingleCard(car));
    } else if (!car.isAvailableForUnder25Hire && isOver25 == "true"){
        cardAnchor.append(renderSingleCard(car));
    }

}

//This method builds up a card object using the materialize classes.
function renderSingleCard(car) {
    const card = document.createElement('div');

    card.className = "card";

    card.appendChild(renderCardImageAndTitle(car));
    card.appendChild(renderCardContent(car));
    card.appendChild(renderCardAction(car));

    return card;
}

/*Does what it says on the tin, this method creates the image section of the card, populates image with first car
 image and adds title through use of a basic string builder. All data is populated from the json.*/
function renderCardImageAndTitle(car) {
    const cardImageContainer = document.createElement('div');
    const cardImage = document.createElement('img');
    const carName = document.createElement('span');

    cardImageContainer.className = "card-image";

    cardImage.src = car.images[0];
    cardImage.height = "450";
    cardImage.width = "400";

    /*During development of this site, I have run lighthouse audits often to highlight shortcomings in my development
    running lighthouse gave poor accessibility for this page so I've made this string builder to alt tag each image*/
    cardImage.alt = "Image of a " + car.make + " " + car.model;

    carName.className = "card-title";
    carName.innerHTML = car.make + " " + car.model;

    cardImageContainer.appendChild(cardImage);
    cardImageContainer.appendChild(carName);

    return cardImageContainer;
}

/*This method creates the content section of the card, same as above, this method manipulates the dom structure to add
a div and paragraph element and populate these from the json. This method also handles conditional display of icons
 depending on fuel type of car.*/
function renderCardContent(car) {
    const cardContentContainer = document.createElement('div');
    const cardParagraph = document.createElement('p');

    cardContentContainer.className = "card-content";

    cardParagraph.innerHTML = car.description;
    cardParagraph.innerHTML += '<br/> Fuel type:';

    //Conditionally decide which icon to display if car is petrol/diesel or electric
    if (car.fuelType != "Electric") {
        cardParagraph.innerHTML += ' ' + car.fuelType;
        cardParagraph.innerHTML += '<i class="material-icons">local_gas_station</i>'
    } else {
        cardParagraph.innerHTML += car.fuelType;
        cardParagraph.innerHTML += '<i class="material-icons">battery_charging_full</i>'
    }

    cardParagraph.innerHTML += ('<br/> Daily Rate: &pound' + car.dailyRate);

    cardContentContainer.appendChild(cardParagraph);

    return cardContentContainer
}

/*This method draws the stub at the bottom of each card with the button. All this method does is create the
stub, add the button with submitCarChoice as button action, and add the submit icon to the button.*/
function renderCardAction(car) {
    const cardAction = document.createElement('div');
    const cardActionButton = document.createElement('button');

    cardAction.className = "card-action right-align";
    cardActionButton.type = "button";
    cardActionButton.className = "btn waves-effect waves-light car-hire-submit-button";
    cardActionButton.setAttribute('onclick', 'submitCarChoice(' + car.id + ')');
    cardActionButton.innerHTML = "Hire this car";
    cardActionButton.innerHTML += "<i class=\"material-icons right\">send</i>";
    cardAction.appendChild(cardActionButton);

    return cardAction;
}

/*Next page is an order page, to save parsing json data, we can simply just save the car we want for our transaction
in local storage and use that object for calculations/fields there*/
function submitCarChoice(carID) {
    localStorage.setItem('selectedCar', JSON.stringify(cars.cars[carID - 1]));
    window.location.href = ("confirmCarHire.html");
}
