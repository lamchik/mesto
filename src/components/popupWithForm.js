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
            e.preventDefault()
            this._onSubmitHandler(this._getInputValues());
        })
    }

    setLoading() {
        const button = this._form.querySelector(".popup__button")
        button.disabled = true
        this._buttonNote = button.textContent
        button.textContent = "Сохранение..."
    }

    unsetLoading() {
        const button = this._form.querySelector(".popup__button")
        button.disabled = false
        button.textContent = this._buttonNote
    }

    closePopup() {
        super.closePopup()
        this._closeForm()
    }

    setOnSubmitHandler(handler) {
        this._onSubmitHandler = handler
    }

}



