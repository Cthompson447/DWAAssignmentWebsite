//declaring cars variable to assign json object to
var cars;

//Using jquery to parse local json file into a javascript object.
$.getJSON("json/cars.json", function (data) {
    cars = data;
});

//for loop, this will render each json object as it's own car.
function renderCars() {
    for(var i=0; i < cars.cars.length; i++) {
        renderCards(cars.cars[i]);
   }
}

// attach our cards to html parent element with cardAnchor id.
function renderCards(car) {
    const cardAnchor = document.getElementById('cardAnchor');

    cardAnchor.append(renderSingleCard(car));

}

//This method builds up a card object using the materialize classes.
function renderSingleCard(car) {
    const card = document.createElement('div');

    card.className = "card";

    card.appendChild(renderCardImageAndTitle(car));
    card.appendChild(renderCardContent(car));
    card.appendChild(renderCardAction());

    return card;
}

function renderCardImageAndTitle(car) {
    const cardImageContainer = document.createElement('div');
    const cardImage = document.createElement('img');
    const carName = document.createElement('span');

    cardImageContainer.className = "card-image";

    cardImage.src =car.images[0];
    cardImage.height ="600";
    cardImage.width ="400";

    carName.className = "card-title";
    carName.innerHTML = car.make + " " + car.model;

    cardImageContainer.appendChild(cardImage);
    cardImageContainer.appendChild(carName);

    return cardImageContainer;
}

function renderCardContent(car) {
    const cardContentContainer = document.createElement('div');
    const cardParagraph = document.createElement('p');

    cardContentContainer.className = "card-content";

    cardParagraph.innerHTML=car.description;
    cardParagraph.innerHTML+='<br/> Fuel type:';

    //Conditionally decide which icon to display if car is petrol/diesel or electric
    if(car.fuelType != "electric"){
        cardParagraph.innerHTML+=' ' + car.fuelType;
        cardParagraph.innerHTML+='<i class="material-icons">local_gas_station</i>'
    } else{
        cardParagraph.innerHTML+=car.fuelType;
        cardParagraph.innerHTML+='<i class="material-icons">battery_charging_full</i>'
    }

    cardParagraph.innerHTML+=('<br/> Daily Rate: &pound' + car.dailyRate);

    cardContentContainer.appendChild(cardParagraph);

    return cardContentContainer
}

function renderCardAction() {
    const cardAction = document.createElement('div');
    const cardActionButton = document.createElement('button');

    cardAction.className="card-action right-align";
    cardActionButton.type="button";
    cardActionButton.id="carHireSubmitButton";
    cardActionButton.className="btn waves-effect waves-light";
    cardActionButton.onclick=submitCarChoice;
    cardActionButton.innerHTML="Hire this car";
    cardActionButton.innerHTML+="<i class=\"material-icons right\">send</i>";
    cardAction.appendChild(cardActionButton);

    return cardAction;
}

function submitCarChoice() {
    alert('car submitted');
}
