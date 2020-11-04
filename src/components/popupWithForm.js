import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(submitForm, closeForm, popupSelector, closeButtonSelector) {
        super(popupSelector, closeButtonSelector)

        this._form = this._popup.querySelector(".popup__form")
        this._onSubmitHandler = submitForm;
        this._closeForm = closeForm;
    }

    _getInputValues() {
        const allInputs = this._form.querySelectorAll(".popup__input")
        const data = {}
        Array.from(allInputs).forEach((input) => {
            data[input.name] = input.value
        })

        return data
    }
    
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (e) => {
            this._onSubmitHandler(e)
        })
    }

    closePopup() {
        super.closePopup()
        this._closeForm()
    }

}
