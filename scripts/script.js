import { Card } from './card.js';
import { FormValidator } from './formValidator.js';
import { openPopup, closePopup} from './popup.js';


// Everything related to popup that changes the name
const name = document.querySelector('.profile__info-name');
const description = document.querySelector('.profile__info-description');
const profileInfoEdit = document.querySelector('.profile__info-edit');

const formName = document.querySelector('.popup__form');
const popupName = document.querySelector('#popup-name');
const nameInput = document.querySelector('.popup__input');
const descriptionInput = document.querySelector('#popup__input-description');
const closeNamePopupButton = document.querySelector('#popup-name .popup__close');

const defaultSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_error',
}

const nameValidator = new FormValidator(defaultSettings, formName);

function addPopupName() {
    openPopup(popupName);
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
    nameValidator.enableValidation();
};


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


profileInfoEdit.addEventListener('click', addPopupName);

closeNamePopupButton.addEventListener('click', function(){
    closePopup(popupName);
});

formName.addEventListener('submit', saveName)

// Everything related to popup that adds place
const addPlaceButton = document.querySelector('.profile__add-button');
const closePlaceButton = document.querySelector('#popup-place .popup__close');
const popupPlace = document.querySelector('#popup-place');
const formPlace = document.querySelector('#popup-place .popup__form');
const placeNameInput = document.querySelector('#popup__input-title');
const placeImageInput = document.querySelector('#popup__input-link');

const placeValidator = new FormValidator(defaultSettings, formPlace);
function addPopupPlace() {
    openPopup(popupPlace)
    placeNameInput.value = '';
    placeImageInput.value = '';
    placeValidator.enableValidation();
}

const section = document.querySelector('.places');

function addPlace(image, title, alt) {        
    const card = new Card(image, title, alt, '#place');
    section.prepend(card.getCard());
};

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


popupCardCloseButton.addEventListener('click', function(){
    closePopup(popupCard)
});

const allPlaces = [
    {
        title: 'Озеро Байкал',
        image: './images/baikal.jpg',
        alt: 'Байкал'
    },
    {
        title: 'Гора Эльбрус',
        image: './images/elbrus.jpg',
        alt: 'Эльбрус'
    },
    {
        title: 'Лёйгавегюр',
        image: './images/laugavegur.jpg',
        alt: 'Лёйгавегюр'
    },
    {
        title: 'Фарерские острова',
        image: './images/faroe.jpg',
        alt: 'Фарерские острова'
    },
    {
        title: 'Мальдивы',
        image: './images/maldives.jpg',
        alt: 'Мальдивы'
    },
    {
        title: 'Ниагарский водопад',
        image: './images/niagarafalls.jpg',
        alt: 'Ниагарский водопад'
    },
];

allPlaces.reverse().forEach(function(item) {
    const newCard = new Card(item.image, item.title, item.alt, '#place');
    const cardElement = newCard.getCard();
    section.prepend(cardElement);
})





    