const planeElement = document.getElementById("plane");
const circleElement = document.getElementById("circle");

function processMouseClick(event) {
    let x = event.clientX - circleElement.offsetWidth / 2 - planeElement.offsetLeft;
    let y = event.clientY - circleElement.offsetHeight / 2 - planeElement.offsetTop;

    circleElement.style.left = x + "px";
    circleElement.style.top = y + "px";

    event.stopPropagation();
}

function wrongClick(event) {
    const newElement = document.createElement("div");
    newElement.classList.add("info-box");

    newElement.style.position = "absolute";
    newElement.style.left = event.clientX + "px";
    newElement.style.top = event.clientY + "px";

    newElement.innerText = "Nie kliknięto w odpowiednim miejscu!";

    document.body.appendChild(newElement);

    setTimeout(() => {
        document.body.removeChild(newElement);
    }, 1000);
}

planeElement.addEventListener("click", processMouseClick);
document.addEventListener("click", wrongClick);