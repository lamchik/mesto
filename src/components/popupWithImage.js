import { Popup } from "./Popup.js";


export class PopupWithImage extends Popup {
    constructor(image, title, alt, popupSelector, closeButtonSelector) {
        super(popupSelector, closeButtonSelector)
        this._image = image;
        this._title = title;
        this._alt = alt;
    }

    openPopup() {
        super.openPopup();
        const popupCard = document.querySelector('.popup-card');
        const popupImg = popupCard.querySelector('.popup-card__img');
        popupImg.src = this._image;
        popupImg.alt = this._alt;
        popupCard.querySelector('.popup-card__title').textContent = this._title;
    }
}