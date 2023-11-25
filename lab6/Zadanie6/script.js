const passwordElement = document.getElementById('password1');
const passwordConfirmElement = document.getElementById('password2');

const passwordToggleOneElement = document.getElementById('toggle-pass1');
const passwordToggleTwoElement = document.getElementById('toggle-pass2');

const formElement = document.getElementById('password-provider');

let isAtLeast8 = false;
let atLeastOneSpecialCharacter = false;
let atLeastOneCapitalCharacter = false;
let atLeastOneDigit = false;

function checkPassword(password) {
    isAtLeast8 = password.length >= 8;
    atLeastOneSpecialCharacter = password.match(/[^a-zA-Z0-9]/) !== null;
    atLeastOneCapitalCharacter = password.match(/[A-Z]/) !== null;
    atLeastOneDigit = password.match(/[0-9]/) !== null;
}

function updatePasswordCheckers() {
    const passwordCheckers = document.querySelectorAll('.password-checker');

    const valueToImgMap = {
        true: 'img/ok.png',
        false: 'img/wrong.png'
    };

    const checkersIsOk = [
        isAtLeast8,
        atLeastOneSpecialCharacter,
        atLeastOneCapitalCharacter,
        atLeastOneDigit
    ];

    for (let i in passwordCheckers) {
        const checker = passwordCheckers[i];
        const isOk = checkersIsOk[i];

        checker.src = valueToImgMap[isOk];
    }
}

function onSubmission(event) {
    if (event.key !== 'Enter') {
        return;
    }

    const password = passwordElement.value;
    const passwordConfirm = passwordConfirmElement.value;

    if (password !== passwordConfirm || !areAllPasswordCheckersOk()) {
        alert('Hasła nie są takie same lub nie spełniają wymagań!');
        event.preventDefault();
    } else {
        alert('Wysłano formularz!');
        passwordElement.value = '';
        passwordConfirmElement.value = '';

        checkPassword('');
        updatePasswordCheckers();
    }
}

function onPasswordChange(event) {
    const password = passwordElement.value;
    const passwordConfirm = passwordConfirmElement.value;

    checkPassword(password);
    updatePasswordCheckers();
}

function togglePasswordVisibility(passwordElement, passwordToggleElement) {
    const shouldBePasswordVisible = passwordElement.type !== 'text';

    passwordElement.type = shouldBePasswordVisible ? 'text' : 'password';
    passwordToggleElement.src = shouldBePasswordVisible ? 'img/eye_open.png' : 'img/eye_not_visible.png';
}

function areAllPasswordCheckersOk() {
    return isAtLeast8 && atLeastOneSpecialCharacter && atLeastOneCapitalCharacter && atLeastOneDigit;
}



passwordElement.addEventListener('input', onPasswordChange);
passwordConfirmElement.addEventListener('input', onPasswordChange);

passwordElement.addEventListener('keypress', onSubmission);
passwordConfirmElement.addEventListener('keypress', onSubmission);

passwordToggleOneElement.addEventListener('click', () => togglePasswordVisibility(passwordElement, passwordToggleOneElement));
passwordToggleTwoElement.addEventListener('click', () => togglePasswordVisibility(passwordConfirmElement, passwordToggleTwoElement));
