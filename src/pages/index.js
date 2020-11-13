import './index.css'; // добавьте импорт главного файла стилей

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { defaultSettings } from '../utils/constants.js';
import { Api } from '../components/Api.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  descriptionSelector: '.profile__info-description',
  imageSelector: '.profile__avatar'
});
// Everything related to popup that changes the name
const profileInfoEdit = document.querySelector('.profile__info-edit');

const formName = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input');
const descriptionInput = document.querySelector('#popup__input-description');
const editAvatar = document.querySelector('.profile__avatar-wrap');
const formAvatar = document.querySelector('#popup-edit-user .popup__form');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    'Content-Type': 'application/json',
    authorization: '9b68a7b1-3b8f-4ce8-9813-2e4457640daa'
  }
});

const edit = new PopupWithForm(
  saveAvatar,
  () => {},
  '#popup-edit-user',
  '.popup__close'
);

function saveAvatar({ link }) {
  edit.setLoading();
  api
    .editAvatarUser(link)
    .then(data => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
      edit.unsetLoading();
      edit.closePopup();
    })
    .catch(err => {
      console.log(err);
    });
}

editAvatar.addEventListener('click', () => {
  edit.setEventListeners();
  edit.openPopup();
});

const deletePopup = new PopupWithForm(
  () => {},
  () => {},
  '#popup-delete',
  '.popup__close'
);
deletePopup.setEventListeners();

const saveNameForm = new PopupWithForm(
  saveName,
  () => {},
  '#popup-name',
  '.popup__close'
);
saveNameForm.setEventListeners();

function saveName({ name, description }) {
  saveNameForm.setLoading();
  api
    .editUser(name, description)
    .then(data => {
      userInfo.setUserInfo(name, description, data.avatar);
      saveNameForm.closePopup();
      saveNameForm.unsetLoading();
    })
    .catch(err => {
      console.log(err);
    });
}

const avatarValidator = new FormValidator(defaultSettings, formAvatar);
avatarValidator.enableValidation();

const nameValidator = new FormValidator(defaultSettings, formName);
nameValidator.enableValidation();

function addPopupName() {
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  descriptionInput.value = info.description;
  saveNameForm.openPopup();
  nameValidator.resetValidation();
}
profileInfoEdit.addEventListener('click', addPopupName);

// Everything related to popup that adds place
const addPlaceButton = document.querySelector('.profile__add-button');
const formPlace = document.querySelector('#popup-place .popup__form');
const placeNameInput = document.querySelector('#popup__input-title');
const placeImageInput = document.querySelector('#popup__input-link');

const placeValidator = new FormValidator(defaultSettings, formPlace);
placeValidator.enableValidation();

const closePlaceForm = () => {
  placeNameInput.value = '';
  placeImageInput.value = '';
};

const popupPlaceInstance = new PopupWithForm(
  saveNewPlace,
  closePlaceForm,
  '#popup-place',
  '.popup__close'
);
popupPlaceInstance.setEventListeners();

function saveNewPlace(obj) {
  popupPlaceInstance.setLoading();
  api
    .createCard(obj.title, obj.link)
    .then(data => {
      addPlace(data.link, data.name, data.name, data._id);
      popupPlaceInstance.closePopup();
      popupPlaceInstance.unsetLoading();
    })
    .catch(err => {
      console.log(err);
    });
}

function addPopupPlace() {
  popupPlaceInstance.openPopup();
  placeValidator.resetValidation();
}

const section = document.querySelector('.places');

const popupCard = new PopupWithImage('#popup-card', '.popup-card__close');
popupCard.setEventListeners();

const cardClickHandler = (image, title, alt) => {
  popupCard.openPopup(image, title, alt);
};

function addPlace(image, title, alt, id) {
  const card = new Card(
    api,
    image,
    title,
    alt,
    id,
    '#place',
    cardClickHandler,
    true,
    deletePopup,
    []
  );
  section.prepend(card.getCard());
}

addPlaceButton.addEventListener('click', addPopupPlace);

api
  .getUser()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
  })
  .catch(err => {
    console.log(err);
  });

api
  .getCard()
  .then(data => {
    const cards = new Section(
      {
        items: data,
        renderer: item => {
          const card = new Card(
            api,
            item.link,
            item.name,
            item.alt,
            item._id,
            '#place',
            cardClickHandler,
            item.owner._id === '6ae7895942a907e86bc8d8a3',
            deletePopup,
            item.likes
          );
          cards.addItem(card.getCard());
        }
      },
      '.places'
    );
    cards.renderItems();
  })
  .catch(err => {
    console.log(err);
  });
