// generic popup functions
function escCallback(event) {   
    if (event.key !== "Escape") {
        return
    };

    const openedPopup = document.querySelector('.popup-state_opened')
    closePopup(openedPopup);
}

function overlayClickCallback(event) {    
    const openedPopup = event.target.closest('.popup-state_opened')
    if (event.target === openedPopup) {
        closePopup(openedPopup);
    }
}

const inputClassError = document.querySelector('.popup__input_error');
function openPopup(popup) {
    popup.classList.add('popup-state_opened');
    document.addEventListener('keydown', escCallback);
    popup.addEventListener('click', overlayClickCallback);
    const formInPopup = popup.querySelector('.popup__form')
    if (formInPopup !== null) {
        cleanErrors(formInPopup, 'popup__input_error', '.popup__input')
    }
}

function closePopup(popup) {
    popup.classList.remove('popup-state_opened');
    document.removeEventListener('keydown', escCallback);
    popup.removeEventListener('click', overlayClickCallback);

}



// Everything related to popup that changes the name
const name = document.querySelector('.profile__info-name');
const description = document.querySelector('.profile__info-description');
const profileInfoEdit = document.querySelector('.profile__info-edit');

const formName = document.querySelector('.popup__form');
const popupName = document.querySelector('#popup-name');
const nameInput = document.querySelector('.popup__input');
const descriptionInput = document.querySelector('#popup__input-description');
const closeNamePopupButton = document.querySelector('#popup-name .popup__close');
const closePopupEsc = document.querySelector('.popup-state');
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
    openPopup(popupName);
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
    const button = popupName.querySelector('.popup__button')
    // добавила валидацию в самое начало, чтобы кнопка изначально была покрашена, так как по дефолту там есть текст
    setButtonState([nameInput, descriptionInput], button, 'popup__button_inactive'); 
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
function addPopupPlace() {
    openPopup(popupPlace)
    placeNameInput.value = '';
    placeImageInput.value = '';
    const button = popupPlace.querySelector('.popup__button')
    setButtonState([placeNameInput, placeImageInput], button, 'popup__button_inactive'); 
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
    openPopup(popupCard)
};

popupCardCloseButton.addEventListener('click', function(){
    closePopup(popupCard)
});
