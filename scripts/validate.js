
const showInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass); 
    errorElement.textContent = inputElement.validationMessage;
};
  
const hideInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, inputErrorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputErrorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass);
    }
};

function cleanErrors(formElement, inputErrorClass, inputSelector) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, inputErrorClass)
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const setButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}
  
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    setButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings.inputErrorClass);
            setButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_error',
});

