import './index.css'; // добавьте импорт главного файла стилей

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { defaultSettings, allPlaces } from '../utils/constants.js';
import { Api } from '../api/Api.js';



// Everything related to popup that changes the name
const profileInfoEdit = document.querySelector('.profile__info-edit');

const formName = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input');
const descriptionInput = document.querySelector('#popup__input-description');


const deletePopup = new PopupWithForm(() => {}, () => {}, '#popup-delete', '.popup__close');
deletePopup.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    descriptionSelector: '.profile__info-description',
    imageSelector: '.profile__avatar'
})

const editUserApi = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-17/users/me",
    headers: {
        "Content-Type" : "application/json",
        authorization: "9b68a7b1-3b8f-4ce8-9813-2e4457640daa"
    }
});

function saveName({name, description}) {
    editUserApi.editUser(name, description).then((data) => {
        userInfo.setUserInfo(name, description, data.avatar)
    }

    )
    
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

const createCardsApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards',
    headers: {
        "Content-Type" : "application/json",
        authorization: "9b68a7b1-3b8f-4ce8-9813-2e4457640daa"
    },
});

function saveNewPlace(obj) {
    createCardsApi.createCard(obj.title, obj.link).then((data) => {
        addPlace(data.link, data.name, data.name, data._id);
    })
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


function addPlace(image, title, alt, id) {        
    const card = new Card(image, title, alt, id, '#place', cardClickHandler, true, deletePopup);
    section.prepend(card.getCard());
};

addPlaceButton.addEventListener('click', addPopupPlace);


const userApi = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-17/users/me",
    headers: {
        "Content-Type" : "application/json",
        authorization: "9b68a7b1-3b8f-4ce8-9813-2e4457640daa"
    }
});


userApi.getUser().then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar)
});


const cardsApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17/cards',
    headers: {
        "Content-Type" : "application/json",
        authorization: "9b68a7b1-3b8f-4ce8-9813-2e4457640daa"
    }
});


cardsApi.getCard().then((data) => {
    
    const cards = new Section({
        items: data,
        renderer: (item) => {
            const card = new Card(item.link, item.name, item.alt, item._id, '#place', cardClickHandler, item.owner._id === '6ae7895942a907e86bc8d8a3', deletePopup);
            cards.addItem(card.getCard())
            
        }
    }, '.places')
    cards.renderItems();
})



