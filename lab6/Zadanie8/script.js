let countries = [];

let filteredCountriesBySubregion = [];

const nameInput = document.querySelector("#name");
const capitalInput = document.querySelector("#capital");
const populationInput = document.querySelector("#population");

const nameSortImgButton = document.querySelector("#name-sort");
const capitalSortImgButton = document.querySelector("#capital-sort");
const populationSortImgButton = document.querySelector("#population-sort");

const regionsElement = document.querySelector("#regions");

const maxCountriesPerPageInput = document.querySelector("#max-countries");

function filterAndSortCountriesByFieldName(fieldName, countriesList, name, sortDirection) {
    if (name !== "") {
        countriesList = countriesList.filter(country => country[fieldName].toLowerCase().includes(name.toLowerCase()));
    }

    if (sortDirection === "asc") {
        countriesList.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
    } else if (sortDirection === "desc") {
        countriesList.sort((a, b) => b[fieldName].localeCompare(a[fieldName]));
    }

    return countriesList;
}

function processCountries() {
    const searchedName = nameInput.value;
    const searchedCapital = capitalInput.value;
    const searchedPopulation = populationInput.value;

    const imgPathToSortDirection = {
        "img/asc.png": "asc",
        "img/desc.png": "desc",
        "img/no-sort.png": "no-sort"
    };

    const sortNameOrder = imgPathToSortDirection[nameSortImgButton.src];
    const sortCapitalOrder = imgPathToSortDirection[capitalSortImgButton.src];
    const sortPopulationOrder = imgPathToSortDirection[populationSortImgButton.src];

    let filteredCountries = countries;

    filteredCountries = filterAndSortCountriesByFieldName("name", filteredCountries, searchedName, sortNameOrder);
    filteredCountries = filterAndSortCountriesByFieldName("capital", filteredCountries, searchedCapital, sortCapitalOrder);
    filteredCountries = filterAndSortCountriesByFieldName("population", filteredCountries, searchedPopulation, sortPopulationOrder);

    const subregions = [...new Set(filteredCountries.map(country => country.subregion))];

    filteredCountriesBySubregion = subregions.map(subregion => {
        return {
            subregion: subregion,
            countries: [],
            population: 0
        };
    });

    const subregionToIndex = filteredCountriesBySubregion
        .reduce((accumulator, currentValue, currentIndex) => {
            const subregion = currentValue.subregion;
            accumulator[subregion] = currentIndex;
            return accumulator;
        }, {});

    filteredCountries.forEach(country => {
        const subregionIndex = subregionToIndex[country.subregion];
        const subregion = filteredCountriesBySubregion[subregionIndex];

        subregion.countries.push(country);
        subregion.population += country.population;
    });

    initializePagination(filteredCountriesBySubregion.length);
}


function createCountryElement(country) {
}


function createSubregionElement(subregion) {
    const subregionElement = document.createElement("div");

    subregionElement.classList = "subregion-element p-2 rounded";

    const subregionHeaderElement = document.createElement("div");

    subregionHeaderElement.classList = "subregion-header";
    const subregionNameElement = document.createElement("div");
    subregionNameElement.classList = "subregion-name";
    console.log(subregion);
    subregionNameElement.innerText = subregion.subregion;

    const subregionPopulationElement = document.createElement("div");
    subregionPopulationElement.classList = "subregion-population";
    subregionPopulationElement.innerText = subregion.population;

    subregionHeaderElement.appendChild(subregionNameElement);
    subregionHeaderElement.appendChild(subregionPopulationElement);

    return subregionElement;
}


function paginationEventHandler(startRegionIndex, endRegionIndex, thisPaginationElement) {
    regionsElement.innerHTML = "";

    for (let i = startRegionIndex; i < endRegionIndex; i++) {
        const subregionObject = filteredCountriesBySubregion[i];
        const subregionElement = createSubregionElement(subregionObject);
        regionsElement.appendChild(subregionElement);
    }

    const paginationElements = document.querySelectorAll(".pagination-element");

    paginationElements
        .forEach(paginationElement => paginationElement.classList.remove("pagination-active"));

    thisPaginationElement.classList.add("pagination-active");
}

function initializePagination(subregionsCount) {
    const maxCountriesPerPage = maxCountriesPerPageInput.value;

    const pagesCount = Math.ceil(subregionsCount / maxCountriesPerPage);

    const paginationContainer = document.querySelector("#pagination");

    for (let i = 0; i < pagesCount; i++) {
        const paginationElement = document.createElement("div");

        paginationElement.classList = "pagination-element p-2 rounded h-50";

        paginationElement.innerText = i + 1;

        paginationElement.addEventListener("click", () =>
            paginationEventHandler(i * maxCountriesPerPage, (i + 1) * maxCountriesPerPage, paginationElement)
        );
        paginationContainer.appendChild(paginationElement);
    }

    paginationEventHandler(0, maxCountriesPerPage, document.querySelector(".pagination-element"));
}

function cycleSortImage(imgElement) {
    const imgPathToNextImgPath = {
        "img/asc.png": "img/desc.png",
        "img/desc.png": "img/no-sort.png",
        "img/no-sort.png": "img/asc.png"
    };

    imgElement.src = imgPathToNextImgPath[imgElement.src];
}

function initializeEvents() {
    nameSortImgButton.addEventListener("click", () => cycleSortImage(nameSortImgButton));
    capitalSortImgButton.addEventListener("click", () => cycleSortImage(capitalSortImgButton));
    populationSortImgButton.addEventListener("click", () => cycleSortImage(populationSortImgButton));

    nameInput.addEventListener("input", processCountries);
    capitalInput.addEventListener("input", processCountries);
    populationInput.addEventListener("input", processCountries);

    maxCountriesPerPageInput.addEventListener("input", processCountries);
}


function initialize() {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            countries = data
                .map(country => {
                    return {
                        name: `${country.name.official} (${country.name.common})`,
                        capital: country.capital?.join(", "),
                        population: country.population ?? 0,
                        continents: country.continents?.join(", "),
                        region: country.region ?? "No region",
                        subregion: country.subregion ?? "No subregion"
                    };
                });
            
            processCountries();
        })
        .catch(error => console.log(error));
}

initialize();