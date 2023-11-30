let counter = 0;
let shouldPropagate = true;
let isBubblingToggle = true;

const togglePropagationButton = document.querySelector('#toggle-propagation');

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
        secondDiv.style.backgroundColor = 'red';
    } else {
        secondDiv.removeEventListener('click', processSecondDiv, !isBubbling);
        secondDiv.style.backgroundColor = 'gray';
    }

    if (counter <= 30) {
        thirdDiv.addEventListener('click', processThirdDiv, !isBubbling);
        thirdDiv.style.backgroundColor = 'yellow';
    } else {
        thirdDiv.removeEventListener('click', processThirdDiv, !isBubbling);
        thirdDiv.style.backgroundColor = 'gray';
    }
}

function resetCounter() {
    counter = 0;
    document.querySelector('#counter > h2').innerText = counter;

    startPropagation();

    isBubblingToggle = true;

    setupListeners(isBubblingToggle);
}

function stopPropagation() {
    shouldPropagate = false;

    togglePropagationButton.innerText = 'Start propagation';
}

function startPropagation() {
    shouldPropagate = true;

    togglePropagationButton.innerText = 'Stop propagation';
}

function togglePropagation() {
    shouldPropagate = !shouldPropagate;

    togglePropagationButton.innerText = shouldPropagate ? 'Stop propagation' : 'Start propagation';
}

function togglePropagationOrder() {
    isBubblingToggle = !isBubblingToggle;

    setupListeners(isBubblingToggle);
}


setupListeners(isBubblingToggle);

document.querySelector('#reset').addEventListener('click', resetCounter);
document.querySelector('#toggle-order').addEventListener('click', togglePropagationOrder);

togglePropagationButton.addEventListener('click', togglePropagation);