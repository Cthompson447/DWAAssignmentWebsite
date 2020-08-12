var cars;

$.getJSON("json/cars.json", function (data) {
    cars = data;
});

function renderCars() {
    for(var i=0; i < cars.cars.length; i++) {
       console.log(cars.cars[i]);
        renderCards(cars.cars[i]);
   }
}

function renderCards(car) {
    const cardAnchor = document.getElementById('cardAnchor');

    cardAnchor.append(renderSingleCard(car));

}

function renderSingleCard(car) {
    const card = document.createElement('div');
    const cardContainer = document.createElement('div');
    const cardImage = document.createElement('img');
    const carName = document.createElement('span');
    const cardContent = document.createElement('div');

    card.className = "card";

    cardContainer.className = "card-image";

    cardImage.src =car.images[0];
    cardImage.height ="600";
    cardImage.width ="400";

    carName.className = "card-title";
    carName.innerHTML = car.make + " " + car.model;

    cardContent.className = "card-content";

    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(carName);
    cardContainer.appendChild(cardContent);

    card.appendChild(cardContainer);


    return card;
}
