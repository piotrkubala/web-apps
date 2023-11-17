function addElement() {
    let list = document.querySelector(".container > ul");

    let listElement = list.children;
    let count = listElement.length;

    let newNumber = count + 1;

    let newElement = document.createElement("li");
    newElement.innerText = "Element " + newNumber;

    list.appendChild(newElement);
}

function removeElement() {
    let list = document.querySelector(".container > ul");

    let firstElement = list.firstElementChild;

    if (firstElement != null) {
        list.removeChild(firstElement);
    }
}