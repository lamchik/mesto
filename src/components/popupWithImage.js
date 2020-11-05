import { Popup } from "./Popup.js";


export class PopupWithImage extends Popup {
    constructor(popupSelector, closeButtonSelector) {
        super(popupSelector, closeButtonSelector)

        this._popupTitle = this._popup.querySelector('.popup-card__title');
        this._popupImg = this._popup.querySelector('.popup-card__img');
    }

    openPopup(image, title, alt) {
        super.openPopup();
        this._popupImg.src = image;
        this._popupImg.alt = alt;
        this._popupTitle.textContent = title;
    }
}