let countries = [];

let filteredCountriesBySubregion = [];

const nameInput = document.querySelector("#name");
const capitalInput = document.querySelector("#capital");
const populationInputMin = document.querySelector("#population-min");
const populationInputMax = document.querySelector("#population-max");
const areaInputMin = document.querySelector("#area-min");
const areaInputMax = document.querySelector("#area-max");

const nameSortIButton = document.querySelector("#name-sort");
const capitalSortIButton = document.querySelector("#capital-sort");
const populationSortIButton = document.querySelector("#population-sort");
const areaSortIButton = document.querySelector("#area-sort");

const regionsElement = document.querySelector("#regions");

const maxRegionsPerPageInput = document.querySelector("#max-countries");

let maxRegionsPerPage = 0;

let paginationPagesCount = 0;
let paginationActiveElementIndex = 0;

function filterCountriesByStringFieldName(fieldName, countriesList, fieldValue) {
    const lowerCaseFieldValue = (new String(fieldValue)).toLowerCase();

    if (lowerCaseFieldValue !== "") {
        countriesList = countriesList.filter(country => 
            country[fieldName].toLowerCase().includes(lowerCaseFieldValue)
        );
    }

    return countriesList;
}

function filterCountriesByNumberFieldName(fieldName, countriesList, minFieldValue, maxFieldValue) {
    let minFieldValueNumber = parseInt(minFieldValue);
    let maxFieldValueNumber = parseInt(maxFieldValue);

    if (isNaN(minFieldValueNumber)) {
        minFieldValueNumber = 0;
    }

    if (isNaN(maxFieldValueNumber)) {
        maxFieldValueNumber = Number.MAX_SAFE_INTEGER;
    }

    countriesList = countriesList.filter(country =>
        country[fieldName] >= minFieldValueNumber && country[fieldName] <= maxFieldValueNumber
    );

    return countriesList;
}


function sortCountriesByStringFieldName(fieldName, countriesList, sortDirection) {
    if (sortDirection === "asc") {
        countriesList.sort((a, b) => a[fieldName].localeCompare(b[fieldName]));
    } else if (sortDirection === "desc") {
        countriesList.sort((a, b) => b[fieldName].localeCompare(a[fieldName]));
    }
}

function sortCountriesByNumberFieldName(fieldName, countriesList, sortDirection) {
    if (sortDirection === "asc") {
        countriesList.sort((a, b) => b[fieldName] - a[fieldName]);
    } else if (sortDirection === "desc") {
        countriesList.sort((a, b) => a[fieldName] - b[fieldName]);
    }
}

function processCountries() {
    const searchedName = nameInput.value;
    const searchedCapital = capitalInput.value;
    const searchedPopulationMin = populationInputMin.value;
    const searchedPopulationMax = populationInputMax.value;
    const searchedAreaMin = areaInputMin.value;
    const searchedAreaMax = areaInputMax.value;

    const sortNameOrder = nameSortIButton.getAttribute("data-sort-direction");
    const sortCapitalOrder = capitalSortIButton.getAttribute("data-sort-direction");
    const sortPopulationOrder = populationSortIButton.getAttribute("data-sort-direction");
    const sortAreaOrder = areaSortIButton.getAttribute("data-sort-direction");

    let filteredCountries = countries;

    filteredCountries = filterCountriesByStringFieldName("name", filteredCountries, searchedName);
    filteredCountries = filterCountriesByStringFieldName("capital", filteredCountries, searchedCapital);
    filteredCountries = filterCountriesByNumberFieldName("population", filteredCountries,
                                                        searchedPopulationMin, searchedPopulationMax);
    filteredCountries = filterCountriesByNumberFieldName("area", filteredCountries,
                                                        searchedAreaMin, searchedAreaMax);

    sortCountriesByStringFieldName("name", filteredCountries, sortNameOrder);
    sortCountriesByStringFieldName("capital", filteredCountries, sortCapitalOrder);
    sortCountriesByNumberFieldName("population", filteredCountries, sortPopulationOrder);
    sortCountriesByNumberFieldName("area", filteredCountries, sortAreaOrder);

    const subregions = [...new Set(filteredCountries.map(country => country.subregion))];

    filteredCountriesBySubregion = subregions.map(subregion => {
        return {
            subregion: subregion,
            countries: [],
            population: 0,
            area: 0
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
        subregion.area += country.area;
    });

    initializePagination(filteredCountriesBySubregion.length);
}

function onMaxCountriesPerPageChange() {
    const minMaxCountriesPerPage = parseInt(maxRegionsPerPageInput.min);
    const maxMaxCountriesPerPage = parseInt(maxRegionsPerPageInput.max);

    const maxCountriesPerPageOrNan = parseInt(maxRegionsPerPageInput.value);

    if (isNaN(maxCountriesPerPageOrNan)) {
        return;
    }

    let maxRegionsPerPageVal = maxCountriesPerPageOrNan;

    if (maxRegionsPerPageVal < minMaxCountriesPerPage) {
        maxRegionsPerPageInput.value = minMaxCountriesPerPage;
    } else if (maxRegionsPerPageVal > maxMaxCountriesPerPage) {
        maxRegionsPerPageInput.value = maxMaxCountriesPerPage;
    }

    maxRegionsPerPage = parseInt(maxRegionsPerPageInput.value);

    processCountries();
}


function createCountryElement(country) {
    const countryElement = document.createElement("div");

    countryElement.classList = "country-element p-2 rounded d-flex justify-content-between";

    const countryNameElement = document.createElement("div");
    countryNameElement.classList = "country-name col-3";
    countryNameElement.innerText = country.name;

    const countryCapitalElement = document.createElement("div");
    countryCapitalElement.classList = "country-capital col-3";
    countryCapitalElement.innerText = country.capital;

    const countryPopulationElement = document.createElement("div");
    countryPopulationElement.classList = "country-population col-3";
    countryPopulationElement.innerText = country.population;

    const countryAreaElement = document.createElement("div");
    countryAreaElement.classList = "country-area col-3";
    countryAreaElement.innerText = country.area;

    countryElement.appendChild(countryNameElement);
    countryElement.appendChild(countryCapitalElement);
    countryElement.appendChild(countryPopulationElement);
    countryElement.appendChild(countryAreaElement);

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
    subregionNameElement.classList = "subregion-name col-6";
    subregionNameElement.innerText = subregion.subregion;

    const subregionPopulationElement = document.createElement("div");
    subregionPopulationElement.classList = "subregion-population col-3";
    subregionPopulationElement.innerText = subregion.population;

    const subregionAreaElement = document.createElement("div");
    subregionAreaElement.classList = "subregion-area col-3";
    subregionAreaElement.innerText = subregion.area;

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
    subregionHeaderElement.appendChild(subregionAreaElement);

    subregionCollapsableElement.appendChild(subregionCountriesElement);

    subregionElement.appendChild(subregionHeaderElement);
    subregionElement.appendChild(subregionCollapsableElement);

    return subregionElement;
}


function paginationEventHandler(startRegionIndex, endRegionIndex, thisPaginationElement, index) {
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

    paginationActiveElementIndex = index;
}

function initializePagination(subregionsCount) {
    const maxCountriesPerPage = maxRegionsPerPageInput.value;

    const paginationContainer = document.querySelector("#pagination");

    paginationContainer.innerHTML = "";

    if (subregionsCount === 0 || maxCountriesPerPage === 0) {
        regionsElement.innerHTML = "";

        paginationPagesCount = 0;
        return;
    }

    const pagesCount = Math.ceil(subregionsCount / maxCountriesPerPage);
    
    const paginationCountsQuotient = paginationPagesCount / pagesCount;
    const newActiveElementIndex = paginationPagesCount === 0 ? 0 : Math.min(Math.round(paginationActiveElementIndex / paginationCountsQuotient), pagesCount - 1);

    paginationPagesCount = pagesCount;

    for (let i = 0; i < pagesCount; i++) {
        const paginationElement = document.createElement("div");

        paginationElement.classList = "pagination-element p-2 rounded h-50";

        paginationElement.innerText = i + 1;

        const startRegionIndex = i * maxCountriesPerPage;
        const endRegionIndex = Math.min((i + 1) * maxCountriesPerPage, subregionsCount);

        paginationElement.addEventListener("click", () =>
            paginationEventHandler(startRegionIndex, endRegionIndex, paginationElement, i)
        );
        paginationContainer.appendChild(paginationElement);

        if (i === newActiveElementIndex) {
            paginationEventHandler(startRegionIndex, endRegionIndex, paginationElement, i);
        }
    }
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
    areaSortIButton.addEventListener("click", () => cycleSortImage(areaSortIButton));

    nameInput.addEventListener("input", processCountries);
    capitalInput.addEventListener("input", processCountries);
    populationInputMin.addEventListener("input", processCountries);
    populationInputMax.addEventListener("input", processCountries);
    areaInputMin.addEventListener("input", processCountries);
    areaInputMax.addEventListener("input", processCountries);

    maxRegionsPerPageInput.addEventListener("input", onMaxCountriesPerPageChange);
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
                        subregion: country.subregion ?? "No subregion",
                        area: country.area ?? 0
                    };
                });
            
            processCountries();
            initializeEvents();
        })
        .catch(error => console.log(error));
}

initialize();