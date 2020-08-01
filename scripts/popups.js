// generic popup functions
function openPopup(popup) {
    popup.classList.add('popup-state_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup-state_opened');
}


// Everything related to popup that changes the name
const name = document.querySelector('.profile__info-name');
const description = document.querySelector('.profile__info-description');
const profileInfoEdit = document.querySelector('.profile__info-edit');

const formName = document.querySelector('.popup__wrapper-name-description');
const popupName = document.querySelector('#popup-name');
const nameInput = document.querySelector('.popup__name');
const descriptionInput = document.querySelector('.popup__description');
const closeNamePopupButton = document.querySelector('#popup-name .popup__close');
function saveName(evt) {
    evt.preventDefault()
    if (nameInput.value !== '') {
        name.textContent = nameInput.value;
    };
    if (descriptionInput.value !== '') {
        description.textContent = descriptionInput.value;
    };
    closePopup(popupName);
};

function addPopupName() {
    openPopup(popupName)
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
};

profileInfoEdit.addEventListener('click', addPopupName);
closeNamePopupButton.addEventListener('click', function(){
    closePopup(popupName)
});
formName.addEventListener('submit', saveName)


// Everything related to popup that adds place
const addPlaceButton = document.querySelector('.profile__add-button');
const closePlaceButton = document.querySelector('#popup-place .popup__close');
const popupPlace = document.querySelector('#popup-place');
const formPlace = document.querySelector('#popup-place .popup__wrapper-name-description');
const placeNameInput = document.querySelector('#popup-place .popup__name');
const placeImageInput = document.querySelector('#popup-place .popup__description');
function addPopupPlace() {
    openPopup(popupPlace)
    placeNameInput.value = '';
    placeImageInput.value = '';
}

function saveNewPlace(evt) {
    evt.preventDefault()
    const name = placeNameInput.value;
    const image = placeImageInput.value;
    addPlace(image, name, name);
    closePopup(popupPlace);
}

addPlaceButton.addEventListener('click', addPopupPlace);
closePlaceButton.addEventListener('click', function(){
    closePopup(popupPlace)
});
formPlace.addEventListener('submit', saveNewPlace);


// Everything related to card popup (popup that shows the single place)
const popupCard = document.querySelector('.popup-card');
const popupCardCloseButton = document.querySelector('#popup-card .popup-card__close');
function addPopupCard(image, title, alt) {
    const popupImg = popupCard.querySelector('.popup-card__img');
    popupImg.src = image;
    popupImg.alt = alt;
    popupCard.querySelector('.popup-card__title').textContent = title;
    popupCard.classList.add('popup-state_opened');
};

popupCardCloseButton.addEventListener('click', function(){
    closePopup(popupCard)
});
