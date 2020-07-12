let nameInput = document.querySelector('.popup__name');
let descriptionInput = document.querySelector('.popup__description');
let name = document.querySelector('.profile__info-name');
let popup = document.querySelector('.popup');
let button = document.querySelector('.popup__button');
let description = document.querySelector('.profile__info-description');
let profileInfoEdit = document.querySelector('.profile__info-edit');
let close = document.querySelector('.popup__close');

function addPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;

    button.addEventListener('click', saveText);
    document.addEventListener('keydown', saveTestOnEnter);
};

function closePopup() {
    popup.classList.remove('popup_opened');

    button.removeEventListener('click', saveText);
    document.removeEventListener('keydown', saveTestOnEnter);
};

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

function saveTestOnEnter(e) {
    if (e.code === 'Enter') {
        saveText();
    }
};

profileInfoEdit.addEventListener('click', addPopup);
close.addEventListener('click', closePopup);
