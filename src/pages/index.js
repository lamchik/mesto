import './index.css'; // добавьте импорт главного файла стилей

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { defaultSettings, allPlaces } from '../utils/constants.js';



// Everything related to popup that changes the name
const profileInfoEdit = document.querySelector('.profile__info-edit');

const formName = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input');
const descriptionInput = document.querySelector('#popup__input-description');


const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    descriptionSelector: '.profile__info-description'
})

function saveName({name, description}) {
    userInfo.setUserInfo(name, description)
    saveNameForm.closePopup();
};
const saveNameForm = new PopupWithForm(saveName, () => {}, '#popup-name', '.popup__close');
saveNameForm.setEventListeners();


const nameValidator = new FormValidator(defaultSettings, formName);
nameValidator.enableValidation();


function addPopupName() {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    descriptionInput.value = info.description;
    saveNameForm.openPopup();
    nameValidator.resetValidation();
};
profileInfoEdit.addEventListener('click', addPopupName);


// Everything related to popup that adds place
const addPlaceButton = document.querySelector('.profile__add-button');
const formPlace = document.querySelector('#popup-place .popup__form');
const placeNameInput = document.querySelector('#popup__input-title');
const placeImageInput = document.querySelector('#popup__input-link');

const placeValidator = new FormValidator(defaultSettings, formPlace);
placeValidator.enableValidation();

function saveNewPlace({title, link}) {
    addPlace(link, title, title);
    popupPlaceInstance.closePopup();
}

const closePlaceForm = () => {
    placeNameInput.value = '';
    placeImageInput.value = '';
}
 
const popupPlaceInstance = new PopupWithForm(saveNewPlace, closePlaceForm, '#popup-place', '.popup__close');
popupPlaceInstance.setEventListeners();


function addPopupPlace() {
    popupPlaceInstance.openPopup();
    placeValidator.resetValidation();
}

const section = document.querySelector('.places');

const popupCard = new PopupWithImage("#popup-card", '.popup-card__close');
popupCard.setEventListeners();


const cardClickHandler = (image, title, alt) => {
    popupCard.openPopup(image, title, alt);
}


function addPlace(image, title, alt) {        
    const card = new Card(image, title, alt, '#place', cardClickHandler);
    section.prepend(card.getCard());
};

addPlaceButton.addEventListener('click', addPopupPlace);

const cards = new Section({
    items: allPlaces,
    renderer: (item) => {
        const card = new Card(item.image, item.title, item.alt, '#place', cardClickHandler);
        cards.addItem(card.getCard())
    }
}, '.places')
cards.renderItems()
