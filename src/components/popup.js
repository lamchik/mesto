export class Popup {
    constructor(popupSelector, closeButtonSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscCloseBinded = this._handleEscClose.bind(this);
        this._overlayClickCallbackBinded = this._overlayClickCallback.bind(this);
        this._popupCardCloseButton = this._popup.querySelector(closeButtonSelector);
        this._closeButtonCallback = () => this.closePopup();
    }

    openPopup() {
        this._popup.classList.add('popup-state_opened');
        document.addEventListener('keydown', this._handleEscCloseBinded);

    }

    closePopup() {
        this._popup.classList.remove('popup-state_opened');
        document.removeEventListener('keydown', this._handleEscCloseBinded);
    }

    _handleEscClose(event) {
        if (event.key !== "Escape") {
            return
        };
        this.closePopup();
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._overlayClickCallbackBinded);
        this._popupCardCloseButton.addEventListener('click', this._closeButtonCallback);
    }


    _overlayClickCallback(event) {    
        const openedPopup = event.target.closest('.popup-state_opened')
        if (event.target === openedPopup) {
            this.closePopup();
        }
    }
}
