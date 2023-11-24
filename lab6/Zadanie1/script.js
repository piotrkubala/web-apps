let counter = 0;
let shouldPropagate = true;
let isBubblingToggle = true;

function updateCounter(amount) {
    counter += amount;
    document.querySelector('#counter > h2').innerText = counter;
}

function potentiallyStopPropagation() {
    if (!shouldPropagate) {
        event.stopPropagation();
    }
}

function processFirstDiv() {
    potentiallyStopPropagation();

    updateCounter(1);

    alert('Nacisnąłeś niebieski przycisk o wartości 1');

    setupListeners(isBubblingToggle);
}

function processSecondDiv() {
    potentiallyStopPropagation();

    updateCounter(2);

    alert('Nacisnąłeś czerwony przycisk o wartości 2');

    setupListeners(isBubblingToggle);
}

function processThirdDiv() {
    potentiallyStopPropagation();

    updateCounter(5);

    alert('Nacisnąłeś żółty przycisk o wartości 5');

    setupListeners(isBubblingToggle);
}

function setupListeners(isBubbling) {
    const firstDiv = document.getElementById('div-one');
    const secondDiv = document.getElementById('div-two');
    const thirdDiv = document.getElementById('div-three');

    firstDiv.removeEventListener('click', processFirstDiv, isBubbling);
    secondDiv.removeEventListener('click', processSecondDiv, isBubbling);
    thirdDiv.removeEventListener('click', processThirdDiv, isBubbling);

    firstDiv.addEventListener('click', processFirstDiv, !isBubbling);

    if (counter <= 50) {
        secondDiv.addEventListener('click', processSecondDiv, !isBubbling);
    } else {
        secondDiv.removeEventListener('click', processSecondDiv, !isBubbling);
    }

    if (counter <= 30) {
        thirdDiv.addEventListener('click', processThirdDiv, !isBubbling);
    } else {
        thirdDiv.removeEventListener('click', processThirdDiv, !isBubbling);
    }
}

function resetCounter() {
    counter = 0;
    document.querySelector('#counter > h2').innerText = counter;

    shouldPropagate = true;
    isBubblingToggle = true;

    setupListeners(isBubblingToggle);
}

function stopPropagation() {
    shouldPropagate = false;
}

function startPropagation() {
    shouldPropagate = true;
}

function togglePropagationOrder() {
    isBubblingToggle = !isBubblingToggle;

    setupListeners(isBubblingToggle);
}


setupListeners(isBubblingToggle);

document.querySelector('#reset').addEventListener('click', resetCounter);
document.querySelector('#stop-propagation').addEventListener('click', stopPropagation);
document.querySelector('#start-propagation').addEventListener('click', startPropagation);
document.querySelector('#toggle-order').addEventListener('click', togglePropagationOrder);