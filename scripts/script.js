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



function createPlace(image, title, alt) {
    const template = document.querySelector('#place').content;
    const place = template.cloneNode(true);

    place.querySelector('.place__img').src = image;
    place.querySelector('.place__img').alt = alt;
    place.querySelector('.place__name').textContent = title;
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
}


