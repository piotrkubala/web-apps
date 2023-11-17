function askUser() {
    let name = prompt("Podaj imię");

    let last_letter = name.charAt(name.length - 1);

    let text = "Witam ";

    text += last_letter === 'a' ? "Panią: " : "Pana: ";

    text += name;

    let element = document.querySelector(".container > p");

    element.innerText = text;
}