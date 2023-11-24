const exercisesElement = document.querySelector('#exercise');

function getCityNameElement(city) {
    const cityElement = document.createElement('div');

    cityElement.innerText = city.name;

    return cityElement;
}

function getCompleteCityElement(city) {
    const cityElement = document.createElement('div');

    cityElement.innerHTML = `
        <div class="city-name">${city.name}</div>
        <div class="city-township">${city.township}</div>
        <div class="city-province">${city.province}</div>
        <div class="city-area">${city.area}</div>
        <div class="city-population">${city.people}</div>
        <div class="city-density">${city.density}</div>
    `;

    return cityElement;
}

function getHeaderElement(exerciseNumber) {
    const headerElement = document.createElement('h2');

    headerElement.innerText = `Zadanie ${exerciseNumber}`;

    return headerElement;
}


function excA(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('A'));

    citiesList.filter(city => city.province === 'małopolskie')
        .forEach(city => {
            newElement.appendChild(getCityNameElement(city));
        });
}

function excB(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('B'));

    citiesList
        .filter(city => city.name.toLowerCase().split("").reduce(
        (a, b) => {
                if (b === 'a') {
                    return a + 1;
                }
                return a;
            }, 0) === 2
        )
        .forEach(city => {
            newElement.appendChild(getCityNameElement(city));
        });
}

function excC(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('C'));

    newElement.appendChild(
        getCityNameElement(
            [...citiesList].sort((a, b) => b.density - a.density)[4]
        )
    );
}

function excD(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('D'));

    citiesList.filter(city => city.people > 100000)
        .map(city => city.name + " city")
        .forEach(city_name => {
            const cityElement = document.createElement('div');
            cityElement.innerText = city_name;
            newElement.appendChild(cityElement);
        });
}

function excE(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('E'));

    const countTo80000 = citiesList.filter(city => city.people <= 80000).length;
    const countOver80000 = citiesList.filter(city => city.people > 80000).length;

    let messsage = "Oba typy miast występują w takiej samej liczbie";

    if (countTo80000 > countOver80000) {
        messsage = "Miast o liczbie ludności mniejszej lub równej 80000 jest więcej";
    } else if (countTo80000 < countOver80000) {
        messsage = "Miast o liczbie ludności większej od 80000 jest więcej";
    }

    const messageElement = document.createElement('div');

    messageElement.innerHTML = `
        <div class="message">${messsage}</div>
        <div class="count-to-80000">Liczba miast do 80000: ${countTo80000}</div>
        <div class="count-over-80000">Liczba miast powyżej 80000: ${countOver80000}</div>
    `;

    newElement.appendChild(messageElement);
}

function excF(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('F'));

    const neededAreas = citiesList
        .filter(city => city.township.startsWith('P'))
        .map(city => city.area);

    const totalArea = neededAreas.reduce((a, b) => a + b, 0);
    const averageArea = Math.round(totalArea / neededAreas.length * 1000) / 1000;

    const messageElement = document.createElement('div');

    messageElement.innerHTML = `
        <div class="average-area">Średnia powierzchnia miast z nazwami zaczynającymi się od P: ${averageArea} km^2</div>
    `;

    newElement.appendChild(messageElement);
}

function excG(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('G'));

    const citiesInPomorskie = citiesList.filter(city => city.province === 'pomorskie');

    const allBiggerThan5000 = citiesInPomorskie.every(city => city.people > 5000);
    const countBiggerThan5000 = citiesInPomorskie.filter(city => city.people > 5000).length;

    const messageAreBiggerThan5000 = allBiggerThan5000 ? "Tak" : "Nie";

    const messageElement = document.createElement('div');

    messageElement.innerHTML = `
        <div class="all-bigger-than-5000">Czy wszystkie miasta w województwie pomorskim mają więcej niż 5000 ludności: ${messageAreBiggerThan5000}</div>
        <div class="count-bigger-than-5000">Liczba miast w województwie pomorskim z ludnością większą niż 5000: ${countBiggerThan5000}</div>
    `;

    newElement.appendChild(messageElement);
}

function processCities(citiesList) {
    excA(citiesList);
    excB(citiesList);
    excC(citiesList);
    excD(citiesList);
    excE(citiesList);
    excF(citiesList);
    excG(citiesList);
}


function doExercises() {
    fetch('./city.json')
        .then(response => response.json())
        .then(citiesList => processCities(citiesList))
        .catch(err => console.log(err));
}

doExercises();