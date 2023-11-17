function appendPerson(person) {
    const parentDiv = document.querySelector(".container > div");
    const newElement = document.createElement("div");

    parentDiv.appendChild(newElement);

    const address = person.Address;

    const addressString = `${address.Street}, ${address.City}, ${address.Country}`;
    const restDataString = `${person.email}, ${person.phone}`;

    newElement.innerHTML = ` \
        <div>   \
            <h3>${person.firstName}</h3> \
            <h4>${person.lastName}</h4> <input type="checkbox"> \
            <div> \
                <h4>${addressString}</h4> \
                <h4>${restDataString}</h4> \
            </div>
        </div>   \
    `;
}

fetch("./user.json")
    .then(response => response.json())
    .then(object => {
        object.forEach(person => {
            appendPerson(person);
        });

        return object;
    })
    .catch(reason => console.log(reason));