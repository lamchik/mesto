export class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement; 
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass); 
        errorElement.textContent = inputElement.validationMessage;
    };
      
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.textContent = '';
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _cleanErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        })
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    
    _setButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
      
    _setEventListeners() {
        this._setButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._setButtonState(); 
            });
        });
    };

    enableValidation() {
        this._setEventListeners(); 

        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
  
    };

    resetValidation() {
        this._cleanErrors();
        this._setButtonState()
    }
    
}



