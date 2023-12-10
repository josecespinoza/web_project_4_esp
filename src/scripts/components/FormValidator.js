import { validationConfig } from "../helpers/config.js";

class FormValidator {
  constructor(form, config = validationConfig) {
    this._form = form;
    this._config = config;
    this._inputValidationHandler = this._inputValidationHandler.bind(this);
    this._formPreSubmitValidationHandler =
      this._formPreSubmitValidationHandler.bind(this);
  }

  _formIsValid() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    return inputs.every((input) => {
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

  _getSubmitButton() {
    return this._form.querySelector(this._config.submitButtonSelector);
  }

  _setFormValidationEventListeners() {
    this._form.addEventListener("input", this._inputValidationHandler);
    this._form.addEventListener(
      "keydown",
      this._formPreSubmitValidationHandler
    );
    this._getSubmitButton().addEventListener(
      "click",
      this._formPreSubmitValidationHandler
    );
  }

  removeFormValidationEventListeners() {
    this._form.removeEventListener("input", this._inputValidationHandler);
    this._form.removeEventListener(
      "keydown",
      this._formPreSubmitValidationHandler
    );
    this._getSubmitButton().removeEventListener(
      "click",
      this._formPreSubmitValidationHandler
    );
  }

  enableValidation() {
    this._toggleButtonStatus();
    this._setFormValidationEventListeners(this._form, this._config);
  }
}

export default FormValidator;
