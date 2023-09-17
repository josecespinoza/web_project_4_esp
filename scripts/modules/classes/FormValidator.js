import { validationConfig } from "../config.js";

class FormValidator {
  constructor(form, config = validationConfig) {
    this._form = form;
    this._config = config;
  }

  _formIsValid() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    return inputs.every((input, index) => {
      return input.validity.valid;
    });
  }

  _toggleButtonStatus() {
    const saveButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
    if (this._formIsValid()) {
      saveButton.classList.remove(this._config.inactiveButtonClass);
    } else {
      saveButton.classList.add(this._config.inactiveButtonClass);
    }
  }

  _inputValidationHandler(evt) {
    const inputElement = evt.target;
    const inputErrorElement = inputElement.nextElementSibling;
    inputErrorElement.textContent = evt.target.validationMessage;
    this._toggleButtonStatus();
  }

  _formPreSubmitValidationHandler(evt) {
    const isSubmitEvent =
      evt.type.toLowerCase() === "click" || evt.key.toLowerCase() === "enter";
    if (!this._formIsValid() && isSubmitEvent) {
      evt.preventDefault();
    }
  }

  _setFormValidationEventListeners() {
    this._form.addEventListener("input", (evt) => {
      this._inputValidationHandler(evt);
    });
    this._form.addEventListener("keydown", (evt) => {
      this._formPreSubmitValidationHandler(evt);
    });
    const submitButton = this._form.querySelector(
      this._config.submitButtonSelector
    );
    submitButton.addEventListener("click", (evt) => {
      this._formPreSubmitValidationHandler(evt);
    });
  }

  enableValidation() {
    this._toggleButtonStatus();
    this._setFormValidationEventListeners(this._form, this._config);
  }
}

export { FormValidator };
