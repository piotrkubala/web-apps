const planeElement = document.getElementById("plane");
const circleElement = document.getElementById("circle");

function processMouseClick(event) {
    let x = event.clientX - circleElement.offsetWidth / 2 - planeElement.offsetLeft;
    let y = event.clientY - circleElement.offsetHeight / 2 - planeElement.offsetTop;

    circleElement.style.left = x + "px";
    circleElement.style.top = y + "px";

    event.stopPropagation();
}

function wrongClick() {
    alert("Nie kliknięto w odpowiednim miejscu!");
}

planeElement.addEventListener("click", processMouseClick);
document.addEventListener("click", wrongClick);