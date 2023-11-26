let countries = [];

let filteredCountriesBySubregion = [];

const nameInput = document.querySelector("#name");
const capitalInput = document.querySelector("#capital");
const populationInput = document.querySelector("#population");

const nameSortIButton = document.querySelector("#name-sort");
const capitalSortIButton = document.querySelector("#capital-sort");
const populationSortIButton = document.querySelector("#population-sort");

const regionsElement = document.querySelector("#regions");

const maxCountriesPerPageInput = document.querySelector("#max-countries");

function filterCountriesByFieldName(fieldName, countriesList, fieldValue) {
    const lowerCaseFieldValue = (new String(fieldValue)).toLowerCase();

    if (lowerCaseFieldValue !== "") {
        countriesList = countriesList.filter(country => {
            if (typeof country[fieldName] === "string") {
                return country[fieldName].toLowerCase().includes(lowerCaseFieldValue);
            } else {
                return country[fieldName] === fieldValue;
            }
        });
    }

    return countriesList;
}

function sortCountriesByFieldName(fieldName, countriesList, sortDirection) {
    if (sortDirection === "asc") {
        countriesList.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
    } else if (sortDirection === "desc") {
        countriesList.sort((a, b) => b[fieldName].localeCompare(a[fieldName]));
    }
}

function processCountries() {
    const searchedName = nameInput.value;
    const searchedCapital = capitalInput.value;
    const searchedPopulation = populationInput.value;

    const sortNameOrder = nameSortIButton.getAttribute("data-sort-direction");
    const sortCapitalOrder = capitalSortIButton.getAttribute("data-sort-direction");
    const sortPopulationOrder = populationSortIButton.getAttribute("data-sort-direction");

    let filteredCountries = countries;

    filteredCountries = filterCountriesByFieldName("name", filteredCountries, searchedName);
    filteredCountries = filterCountriesByFieldName("capital", filteredCountries, searchedCapital);
    filteredCountries = filterCountriesByFieldName("population", filteredCountries, searchedPopulation);

    sortCountriesByFieldName("name", filteredCountries, sortNameOrder);
    sortCountriesByFieldName("capital", filteredCountries, sortCapitalOrder);
    sortCountriesByFieldName("population", filteredCountries, sortPopulationOrder);

    const subregions = [...new Set(filteredCountries.map(country => country.subregion))];

    filteredCountriesBySubregion = subregions.map(subregion => {
        return {
            subregion: subregion,
            countries: [],
            population: 0
        };
    });

    filteredCountriesBySubregion.sort((a, b) => a.subregion.localeCompare(b.subregion));

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

function onMaxCountriesPerPageChange() {
    const minMaxCountriesPerPage = parseInt(maxCountriesPerPageInput.min);
    const maxMaxCountriesPerPage = parseInt(maxCountriesPerPageInput.max);

    const maxCountriesPerPage = parseInt(maxCountriesPerPageInput.value);

    if (maxCountriesPerPage < minMaxCountriesPerPage) {
        maxCountriesPerPageInput.value = minMaxCountriesPerPage;
    } else if (maxCountriesPerPage > maxMaxCountriesPerPage) {
        maxCountriesPerPageInput.value = maxMaxCountriesPerPage;
    }

    processCountries();
}


function createCountryElement(country) {
    const countryElement = document.createElement("div");

    countryElement.classList = "country-element p-2 rounded d-flex justify-content-between";

    const countryNameElement = document.createElement("div");
    countryNameElement.classList = "country-name col-2";
    countryNameElement.innerText = country.name;

    const countryCapitalElement = document.createElement("div");
    countryCapitalElement.classList = "country-capital col-2";
    countryCapitalElement.innerText = country.capital;

    const countryPopulationElement = document.createElement("div");
    countryPopulationElement.classList = "country-population col-2";
    countryPopulationElement.innerText = country.population;

    countryElement.appendChild(countryNameElement);
    countryElement.appendChild(countryCapitalElement);
    countryElement.appendChild(countryPopulationElement);

    return countryElement;
}


function createSubregionElement(subregion, index) {
    const subregionElementId = `subregion-${index}`;

    const subregionElement = document.createElement("div");

    subregionElement.classList = "subregion-element p-2 rounded";

    const subregionHeaderElement = document.createElement("a");
    subregionHeaderElement.classList = "btn btn-primary subregion-header d-flex justify-content-between";
    subregionHeaderElement.setAttribute("data-bs-toggle", "collapse");
    subregionHeaderElement.setAttribute("href", `#${subregionElementId}`);
    subregionHeaderElement.setAttribute("role", "button");
    subregionHeaderElement.setAttribute("aria-expanded", "false");
    subregionHeaderElement.setAttribute("aria-controls", subregionElementId);

    const subregionNameElement = document.createElement("div");
    subregionNameElement.classList = "subregion-name col-8";
    subregionNameElement.innerText = subregion.subregion;

    const subregionPopulationElement = document.createElement("div");
    subregionPopulationElement.classList = "subregion-population col-4";
    subregionPopulationElement.innerText = subregion.population;

    const subregionCollapsableElement = document.createElement("div");
    subregionCollapsableElement.classList = "subregion-collapsable collapse";
    subregionCollapsableElement.id = subregionElementId;

    const subregionCountriesElement = document.createElement("div");
    subregionCountriesElement.classList = "subregion-countries card card-body";

    subregion.countries.forEach(country => {
        const countryElement = createCountryElement(country);
        subregionCountriesElement.appendChild(countryElement);
    });

    subregionHeaderElement.appendChild(subregionNameElement);
    subregionHeaderElement.appendChild(subregionPopulationElement);

    subregionCollapsableElement.appendChild(subregionCountriesElement);

    subregionElement.appendChild(subregionHeaderElement);
    subregionElement.appendChild(subregionCollapsableElement);

    return subregionElement;
}


function paginationEventHandler(startRegionIndex, endRegionIndex, thisPaginationElement) {
    regionsElement.innerHTML = "";

    for (let i = startRegionIndex; i < endRegionIndex; i++) {
        const subregionObject = filteredCountriesBySubregion[i];
        const subregionElement = createSubregionElement(subregionObject, i);
        regionsElement.appendChild(subregionElement);
    }

    const paginationElements = document.querySelectorAll(".pagination-element");

    paginationElements
        .forEach(paginationElement => paginationElement.classList.remove("pagination-active"));

    thisPaginationElement.classList.add("pagination-active");
}

function initializePagination(subregionsCount) {
    const maxCountriesPerPage = maxCountriesPerPageInput.value;

    const paginationContainer = document.querySelector("#pagination");

    paginationContainer.innerHTML = "";

    if (subregionsCount === 0) {
        return;
    }

    const pagesCount = Math.ceil(subregionsCount / maxCountriesPerPage);

    for (let i = 0; i < pagesCount; i++) {
        const paginationElement = document.createElement("div");

        paginationElement.classList = "pagination-element p-2 rounded h-50";

        paginationElement.innerText = i + 1;

        const startRegionIndex = i * maxCountriesPerPage;
        const endRegionIndex = Math.min((i + 1) * maxCountriesPerPage, subregionsCount);

        paginationElement.addEventListener("click", () =>
            paginationEventHandler(startRegionIndex, endRegionIndex, paginationElement)
        );
        paginationContainer.appendChild(paginationElement);
    }

    paginationEventHandler(0, Math.min(maxCountriesPerPage, subregionsCount),
                            document.querySelector(".pagination-element"));
}

function cycleSortImage(inputSortElement) {
    const sortDirection = inputSortElement.getAttribute("data-sort-direction");

    let newSortDirection = "asc";

    if (sortDirection === "asc") {
        newSortDirection = "desc";
    } else if (sortDirection === "desc") {
        newSortDirection = "none";
    }

    const sortDirectionToArrow = {
        "asc": "&uarr;",
        "desc": "&darr;",
        "none": "&harr;"
    };

    inputSortElement.innerHTML = sortDirectionToArrow[newSortDirection];
    inputSortElement.setAttribute("data-sort-direction", newSortDirection);

    processCountries();
}

function initializeEvents() {
    nameSortIButton.addEventListener("click", () => cycleSortImage(nameSortIButton));
    capitalSortIButton.addEventListener("click", () => cycleSortImage(capitalSortIButton));
    populationSortIButton.addEventListener("click", () => cycleSortImage(populationSortIButton));

    nameInput.addEventListener("input", processCountries);
    capitalInput.addEventListener("input", processCountries);
    populationInput.addEventListener("input", processCountries);

    maxCountriesPerPageInput.addEventListener("input", onMaxCountriesPerPageChange);
}


function initialize() {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            countries = data
                .map(country => {
                    return {
                        name: `${country.name.official} (${country.name.common})`,
                        capital: country.capital?.join(", ") ?? "No capital",
                        population: country.population ?? 0,
                        continents: country.continents?.join(", "),
                        region: country.region ?? "No region",
                        subregion: country.subregion ?? "No subregion"
                    };
                });
            
            processCountries();
            initializeEvents();
        })
        .catch(error => console.log(error));
}

initialize();