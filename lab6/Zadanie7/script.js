function selectImage(event, imgElement, index) {
    const modalBodyImg = document.querySelector('.modal-body img');
    const modalTitle = document.querySelector('.modal-title');

    modalTitle.innerText = imgElement.alt;
    modalBodyImg.src = imgElement.src;
    modalBodyImg.id = index;
}

function addEvents() {
    const imagesElements = document.querySelectorAll('.img-gallery');

    for (let i of imagesElements.keys()) {
        const img = imagesElements[i];

        img.addEventListener('click', (event) => selectImage(event, img, i));
    }

    const prevButton = document.getElementById('button-previous');
    const nextButton = document.getElementById('button-next');

    prevButton.addEventListener('click', (event) => changeImage(event, -1));
    nextButton.addEventListener('click', (event) => changeImage(event, 1));
}

function changeImage(event, indexDelta) {
    const modalBodyImg = document.querySelector('.modal-body img');
    const modalTitle = document.querySelector('.modal-title');

    const currentImageIndex = parseInt(modalBodyImg.id);
    const newImageIndex = (currentImageIndex + indexDelta + 6 - 1) % 6 + 1;

    const imagePath = `img/img${newImageIndex}.jpg`;

    modalTitle.innerText = `Zdjęcie ${newImageIndex}`;
    modalBodyImg.src = imagePath;
    modalBodyImg.id = newImageIndex;
}

addEvents();