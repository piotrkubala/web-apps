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

function filterAndSortCountriesByFieldName(fieldName, countriesList, fieldValue, sortDirection) {
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

    const sortNameOrder = nameSortIButton.getAttribute("data-sort-direction");
    const sortCapitalOrder = capitalSortIButton.getAttribute("data-sort-direction");
    const sortPopulationOrder = populationSortIButton.getAttribute("data-sort-direction");

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
}


function createSubregionElement(subregion) {
    const subregionElement = document.createElement("div");

    subregionElement.classList = "subregion-element p-2 rounded";

    const subregionHeaderElement = document.createElement("div");

    subregionHeaderElement.classList = "subregion-header";
    const subregionNameElement = document.createElement("div");
    subregionNameElement.classList = "subregion-name";
    subregionNameElement.innerText = subregion.subregion;

    const subregionPopulationElement = document.createElement("div");
    subregionPopulationElement.classList = "subregion-population";
    subregionPopulationElement.innerText = subregion.population;

    subregionHeaderElement.appendChild(subregionNameElement);
    subregionHeaderElement.appendChild(subregionPopulationElement);

    subregionElement.appendChild(subregionHeaderElement);

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