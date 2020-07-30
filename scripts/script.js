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
const closeFullPlace = document.querySelector('#popup-card .popup-card__close');
const popupCard = document.querySelector('.popup-card');




function saveText(evt) {
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
    popupName.classList.add('popup-state_opened');
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;
};

function closePopup(popup) {
    popup.classList.remove('popup-state_opened');
}

profileInfoEdit.addEventListener('click', addPopupName);
closeNameButton.addEventListener('click', function(){closePopup(popupName)});

form.addEventListener('submit', saveText)



function addPopupPlace() {
    popupPlace.classList.add('popup-state_opened');
    placeNameInput.value = '';
    placeImageInput.value = '';
}

ProfileAddButton.addEventListener('click', addPopupPlace);
closePlaceButton.addEventListener('click', function(){closePopup(popupPlace)});


function addPlace(image, title, alt) {
    const place = createPlace(image, title, alt);

    const section = document.querySelector('.places');
    section.prepend(place);

    const places = section.querySelectorAll('.place');
    const firstPlace = places[0];
    // function deletePlace() {
    //     firstPlace.remove();
    // }
    
    // const cart = firstPlace.querySelector('.place__cart');
    // cart.addEventListener('click', deletePlace);

    const placeImg = firstPlace.querySelector('.place__img');
    function addPopupCard() {
        const img = popupCard.querySelector('.popup-card__img');
        img.src = image;
        img.alt = alt;
        popupCard.querySelector('.popup-card__title').textContent = title;
        popupCard.classList.add('popup-state_opened');
    };

    placeImg.addEventListener('click', addPopupCard);
    
};

closeFullPlace.addEventListener('click', function(){closePopup(popupCard)});



function saveNewPlace(evt) {
    evt.preventDefault()
    const name = placeNameInput.value;
    const image = placeImageInput.value;
    addPlace(image, name, name);
    closePopup(popupPlace);
}

formPlace.addEventListener('submit', saveNewPlace);



function createPlace(image, title, alt) {
    const template = document.querySelector('#place').content;
    const place = template.cloneNode(true);
    const img = place.querySelector('.place__img');
    img.src = image;
    img.alt = alt;
    place.querySelector('.place__name').textContent = title;
    const like = place.querySelector('.place__like');
    
    function likedCard() {
        like.classList.toggle('place__like_active');
    }
    like.addEventListener('click', likedCard);

    console.log(place.querySelector(".place__cart"))
    places = document.querySelector(".places")
    place.querySelector(".place__cart").addEventListener("click", function(){
        places.removeChild(place)
    })
   
    return place;
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

for (let i = allPlaces.length - 1; i >= 0; i -= 1) {
    addPlace(allPlaces[i].image, allPlaces[i].title, allPlaces[i].alt);
};


