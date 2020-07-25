const nameInput = document.querySelector('.popup__name');
const descriptionInput = document.querySelector('.popup__description');
const name = document.querySelector('.profile__info-name');
const popupName = document.querySelector('#popup-name');
const description = document.querySelector('.profile__info-description');
const profileInfoEdit = document.querySelector('.profile__info-edit');
const closeNameButton = document.querySelector('#popup-name .popup__close');
const form = document.querySelector('.popup__wrapper-name-description');
const popupPlace = document.querySelector('#popup-place');
const ProfileAddButton = document.querySelector('.profile__add-button');
const closePlaceButton = document.querySelector('#popup-place .popup__close');
const placeNameInput = document.querySelector('#popup-place .popup__name');
const placeImageInput = document.querySelector('#popup-place .popup__description');
const formPlace = document.querySelector('#popup-place .popup__wrapper-name-description');



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

function addPopupName() {
    popupName.classList.add('popup_opened');
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
};


function closePopupName() {
    popupName.classList.remove('popup_opened');
};

profileInfoEdit.addEventListener('click', addPopupName);
closeNameButton.addEventListener('click', closePopupName);

form.addEventListener('submit', saveText)



function addPopupPlace() {
    popupPlace.classList.add('popup_opened');
    placeNameInput.value = '';
    placeImageInput.value = '';
}

function closePopupPlace() {
    popupPlace.classList.remove('popup_opened');
};

ProfileAddButton.addEventListener('click', addPopupPlace);
closePlaceButton.addEventListener('click', closePopupPlace);


function addPlaceToBegining(image, title, alt) {
    const place = createPlace(image, title, alt);

    const section = document.querySelector('.places');
    section.prepend(place);
};

function saveNewPlace(evt) {
    evt.preventDefault()
    let name = placeNameInput.value;
    let image = placeImageInput.value;
    addPlaceToBegining(image, name, name);
    closePopupPlace();
}

formPlace.addEventListener('submit', saveNewPlace);



function createPlace(image, title, alt) {
    const template = document.querySelector('#place').content;
    const place = template.cloneNode(true);

    place.querySelector('.place__img').src = image;
    place.querySelector('.place__img').alt = alt;
    place.querySelector('.place__name').textContent = title;
    const like = place.querySelector('.place__like');
    
    function likedCard() {
        like.classList.toggle('place__like_active');
    }
    like.addEventListener('click', likedCard);
   
    return place;
}


function addPlace(image, title, alt) {
    const place = createPlace(image, title, alt);

    const section = document.querySelector('.places');
    section.append(place);
}


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

for (let i = 0; i < allPlaces.length; i += 1) {
    addPlace(allPlaces[i].image, allPlaces[i].title, allPlaces[i].alt);
};



