let counter = 0;

let buttonActivate = document.getElementById("activate");
let buttonDeactivate = document.getElementById("deactivate");

function increment() {
    counter++;

    let paragraph = document.querySelector(".container > p");

    paragraph.innerText = "Wartość licznika: " + counter;
}

function activate() {
    let paragraph = document.querySelector(".container > p");
    counter = 0;

    paragraph.innerText = "Wartość licznika: " + counter;

    let buttonIncrement = document.getElementById("increment");
    buttonIncrement.addEventListener("click", increment);

    buttonActivate.removeEventListener("click", activate);
    buttonDeactivate.addEventListener("click", deactivate);
}

function deactivate() {
    let paragraph = document.querySelector(".container > p");

    paragraph.innerText = "Licznik wyłączony";

    let buttonIncrement = document.getElementById("increment");
    buttonIncrement.removeEventListener("click", increment);

    buttonActivate.addEventListener("click", activate);
    buttonDeactivate.removeEventListener("click", deactivate);
}

buttonActivate.addEventListener("click", activate);