let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description');
let name = document.querySelector('.profile__info-name');
let popup = document.querySelector('.popup');
let description = document.querySelector('.profile__info-description');
let profileInfoEdit = document.querySelector('.profile__info-edit');
let close = document.querySelector('.popup__close');
let form = document.querySelector('.popup__wrapper-name-description');

function saveText(evt) {
    evt.preventDefault()
    if (nameInput.value !== '') {
        name.textContent = nameInput.value;
    };
    if (descriptionInput.value !== '') {
        description.textContent = descriptionInput.value;
    };
    closePopup();
};

function addPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

profileInfoEdit.addEventListener('click', addPopup);
close.addEventListener('click', closePopup);

form.addEventListener('submit', saveText)