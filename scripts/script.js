function addPopup() {
    const nameInput = document.querySelector('.popup__name');
    const descriptionInput = document.querySelector('.popup__description');
    const name = document.querySelector('.profile__info-name');
    const description = document.querySelector('.profile__info-description');
    const popup = document.querySelector('.popup');
    const button = document.querySelector('.popup__button');

    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;

    button.addEventListener('click', saveText);
    document.addEventListener('keydown', saveTestOnEnter);
};

function closePopup() {
    const popup = document.querySelector('.popup');
    const button = document.querySelector('.popup__button');

    popup.classList.remove('popup_opened');

    button.removeEventListener('click', saveText);
    document.removeEventListener('keydown', saveTestOnEnter);
};

function saveText() {
    const nameInput = document.querySelector('.popup__name');
    const descriptionInput = document.querySelector('.popup__description');
    const name = document.querySelector('.profile__info-name');
    const description = document.querySelector('.profile__info-description');

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

const profileInfoEdit = document.querySelector('.profile__info-edit');
profileInfoEdit.addEventListener('click', addPopup);

const close = document.querySelector('.popup__close');
close.addEventListener('click', closePopup);
