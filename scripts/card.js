
import { openPopup } from './popup.js';
const popupCard = document.querySelector('.popup-card');


export class Card {
    constructor(image, title, alt, templateSelector) {
        this._image = image;
        this._title = title;
        this._alt = alt;
        this._template = document.querySelector(templateSelector).content.cloneNode(true);
        this._imageObject = this._template.querySelector('.place__img');
    }


    _insertData() {
        this._imageObject.src = this._image;
        this._imageObject.alt = this._alt;
        this._template.querySelector('.place__name').textContent = this._title;
    }

    _addPopupCard() {
        const popupImg = popupCard.querySelector('.popup-card__img');
        popupImg.src = this._image;
        popupImg.alt = this._alt;
        popupCard.querySelector('.popup-card__title').textContent = this._title;
        openPopup(popupCard)
    }
    
    _addListeners() {
        const like = this._template.querySelector('.place__like');
        like.addEventListener('click', function(){
            like.classList.toggle('place__like_active');
        });

        const placeCart = this._template.querySelector(".place__cart");
        placeCart.addEventListener("click", function(e){
            e.target.closest('.place').remove();
        })

        this._imageObject.addEventListener('click', () => {
            this._addPopupCard()
        });
    }

    getCard() {
        this._insertData()
        this._addListeners()
        return this._template;
    }
}





