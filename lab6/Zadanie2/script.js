let idCounter = 0;

function removePerson(personId) {
    const personElement = document.getElementById(personId);
    personElement.parentNode.removeChild(personElement);
}

function isNameCorrect(name) {
    const pattern = /^[A-Z][a-z]*(-[A-Z][a-z]*)* [A-Z][a-z]*(-[A-Z][a-z]*)*$/;

    return pattern.test(name);
}

function isPhoneNumberCorrect(phoneNumber) {
    const pattern = /^\+?(\s*[0-9]\s*){9}((\s*[0-9]\s*){3})?$/;

    return pattern.test(phoneNumber);
}

function addPerson() {
    const peopleElement = document.getElementById("people");
    const newElement = document.createElement("div");

    const nameElement = document.getElementById("name");
    const phoneNumberElement = document.getElementById("phone-number");

    const name = nameElement.value;
    const phoneNumber = phoneNumberElement.value;

    if (!isNameCorrect(name)) {
        alert("Podano niepoprawne imię i nazwisko.");
        return;
    }

    if (!isPhoneNumberCorrect(phoneNumber)) {
        alert("Podano niepoprawny numer telefonu.");
        return;
    }

    idCounter++;

    const personId = "person" + idCounter;

    newElement.innerHTML = `
        <div class="col-10">
            <div class="name">${name}</div>
            <div class="phone-number">${phoneNumber}</div>
        </div>
        <div class="col-1">
            <button onclick="removePerson('${personId}')" class="btn btn-danger">Usuń</button>
        </div>
    `;

    newElement.id = personId;
    newElement.classList.add("person");
    newElement.classList.add("row");
    newElement.classList.add("p-2");

    peopleElement.appendChild(newElement);

    nameElement.value = "";
    phoneNumberElement.value = "";
}


document.getElementById("add-person").addEventListener("click", addPerson);
