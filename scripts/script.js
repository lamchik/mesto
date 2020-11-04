import { Card } from './card.js';
import { FormValidator } from './formValidator.js';
import { PopupWithImage } from './popupWithImage.js';
import { PopupWithForm } from './popupWithForm.js'
import { UserInfo } from './userInfo.js'



// Everything related to popup that changes the name
const profileInfoEdit = document.querySelector('.profile__info-edit');

const formName = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input');
const descriptionInput = document.querySelector('#popup__input-description');

const defaultSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_error',
}

const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    descriptionSelector: '.profile__info-description'
})

function saveName(evt) {
    evt.preventDefault()
    
    userInfo.setUserInfo(nameInput.value, descriptionInput.value)
    saveNameForm.closePopup();
};
const saveNameForm = new PopupWithForm(saveName, () => {}, '#popup-name', '.popup__close');

const nameValidator = new FormValidator(defaultSettings, formName);

function addPopupName() {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    descriptionInput.value = info.description;
    saveNameForm.openPopup();
    nameValidator.enableValidation();
};
profileInfoEdit.addEventListener('click', addPopupName);


// Everything related to popup that adds place
const addPlaceButton = document.querySelector('.profile__add-button');
const formPlace = document.querySelector('#popup-place .popup__form');
const placeNameInput = document.querySelector('#popup__input-title');
const placeImageInput = document.querySelector('#popup__input-link');

const placeValidator = new FormValidator(defaultSettings, formPlace);

function saveNewPlace(evt) {
    evt.preventDefault()
    const name = placeNameInput.value;
    const image = placeImageInput.value;
    addPlace(image, name, name);
    popupPlaceInstance.closePopup();
}

const closePlaceForm = () => {
    placeNameInput.value = '';
    placeImageInput.value = '';
}
 
const popupPlaceInstance = new PopupWithForm(saveNewPlace, closePlaceForm, '#popup-place', '.popup__close')

function addPopupPlace() {
    popupPlaceInstance.openPopup()
    placeValidator.enableValidation();
}

const section = document.querySelector('.places');


const cardClickHandler = (image, title, alt) => {
    const popupCard = new PopupWithImage(image, title, alt, "#popup-card", '.popup-card__close')
    popupCard.openPopup()
}


function addPlace(image, title, alt) {        
    const card = new Card(image, title, alt, '#place', cardClickHandler);
    section.prepend(card.getCard());
};

addPlaceButton.addEventListener('click', addPopupPlace);


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
    const newCard = new Card(item.image, item.title, item.alt, '#place', cardClickHandler);
    const cardElement = newCard.getCard();
    section.prepend(cardElement);
})







