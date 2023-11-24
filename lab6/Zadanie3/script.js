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

    citiesList.filter(city => city.name.includes('a'))
        .forEach(city => {
            newElement.appendChild(getCityNameElement(city));
        });
}

function excC(citiesList) {
    const newElement = document.createElement('div');
    exercisesElement.appendChild(newElement);

    newElement.appendChild(getHeaderElement('C'));

    citiesList.sort((a, b) => a.density - b.density)

    newElement.appendChild(getCompleteCityElement(citiesList[4]))
}

function excD(citiesList) {
}

function excE(citiesList) {
}

function excF(citiesList) {
}

function excG(citiesList) {
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