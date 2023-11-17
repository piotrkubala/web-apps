
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];


const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];


function printOnAPage(table, sectionName) {
    let appDiv = document.getElementById("app");

    let newElement = document.createElement("li");
    newElement.innerHTML = `<h3>${sectionName}</h3>`;

    appDiv.appendChild(newElement);

    let newList = document.createElement("ol");
    newElement.appendChild(newList);

    table.forEach(tElement => {
        let elementForItem = document.createElement("li");

        elementForItem.innerText = tElement;

        newList.appendChild(elementForItem);
    });
}


// 1. Na stronach internetowych wyświetlają się nazwy zawierające znak "r".  ( tablica names)

const namesWithR = names.filter(name => name.includes('r'));

printOnAPage(namesWithR, "Zadanie 1");

/* 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. wynik wyswietl na stronei w sekcji 2
      sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6 wyników. wynik wyświetl w przeglądarce w sekcji 2
      inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
      Nesteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2 */

const areAllLessThanNine = numbers.every(number => number < 9);
const existsLessThanSix = numbers.some(number => number < 6);

const lastExercise = numbers.map(number => number + 1)
    .filter(number => number % 2 === 1)
    .reduce((previous, current) => previous + current, 0);

printOnAPage([areAllLessThanNine], "Zadanie 2.1");
printOnAPage([existsLessThanSix], "Zadanie 2.2");
printOnAPage([lastExercise], "Zadanie 2.3");

// 3. Na stronach internetowych wyświetlają się kraje z Europy

const countriesInEurope = countries.filter(country => country.continent === 'Europe')
    .map(country => country.name);

printOnAPage(countriesInEurope, "Zadanie 3.");

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. wyświetlanie wyników na stronach internetowych.

const replicantPeople = people.filter(person => {
    const indexOfAt = person.email.indexOf("@");

    const domain = person.email.substring(indexOfAt + 1);

    return domain === "replicant.io";
}).map(person => {
    let splittedName = person.name.split(' ');

    return splittedName[splittedName.length - 1];
});

printOnAPage(replicantPeople, "Zadanie 4.");

// 5. usuwanie zduplikowanych wartości z tablicy nazwaduplikatu

let withoutDuplicates = Array.from((new Set(duplicateName)));

printOnAPage(withoutDuplicates, "Zadanie 5.");