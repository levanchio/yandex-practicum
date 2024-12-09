function showInputError(formElement, inputElement, errorMessage, inputClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(inputClass);
    errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(inputClass);
    errorElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    const inputInvalidMessage = inputElement.validationMessage;

    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    } else {
        let errorMessage = '';

        if (inputElement.validity.tooShort) {
            errorMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${inputElement.value.length}`;
        } else if (inputElement.validity.valueMissing) {
            errorMessage = 'Вы пропустили это поле';
        } else if (inputElement.validity.typeMismatch) {
            errorMessage = 'Введите корректное значение';
        } else {
            errorMessage = inputInvalidMessage;
        }

        showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((element) => (!element.validity.valid));
}

function toggleButtonState(inputList, buttonElement, buttonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(buttonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(buttonClass);
        buttonElement.disabled = false;
    }
}

function setEventListeners(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputClass));
    const buttonElement = formElement.querySelector(validationSettings.buttonClass);
    toggleButtonState(inputList, buttonElement, validationSettings.buttonInactiveClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationSettings.inputErrorClass, validationSettings.errorClass);
            toggleButtonState(inputList, buttonElement, validationSettings.buttonInactiveClass);
        });
    });
}

function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formClass));
    formList.forEach((formElement) => {
        setEventListeners(formElement, validationSettings);
    });
}

export { enableValidation };
