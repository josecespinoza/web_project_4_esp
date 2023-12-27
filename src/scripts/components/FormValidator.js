import { validationConfig } from "../helpers/config.js";

class FormValidator {
  #form;
  #config;

  constructor(form, config = validationConfig) {
    this.#form = form;
    this.#config = config;
  }

  #formIsValid() {
    const inputs = Array.from(
      this.#form.querySelectorAll(this.#config.inputSelector)
    );
    return inputs.every((input) => {
      return input.validity.valid;
    });
  }

  #toggleButtonStatus() {
    const saveButton = this.#form.querySelector(
      this.#config.submitButtonSelector
    );
    if (this.#formIsValid()) {
      saveButton.classList.remove(this.#config.inactiveButtonClass);
    } else {
      saveButton.classList.add(this.#config.inactiveButtonClass);
    }
  }

  #inputValidationHandler(evt) {
    const inputElement = evt.target;
    const inputErrorElement = inputElement.nextElementSibling;
    inputErrorElement.textContent = evt.target.validationMessage;
    this.#toggleButtonStatus();
  }

  #formPreSubmitValidationHandler(evt) {
    const isSubmitEvent =
      evt.type.toLowerCase() === "click" || evt.key?.toLowerCase() === "enter";

    if (!this.#formIsValid() && isSubmitEvent) {
      evt.preventDefault();
    }
  }

  #getSubmitButton() {
    return this.#form.querySelector(this.#config.submitButtonSelector);
  }

  #setFormValidationEventListeners() {
    this.#form.addEventListener(
      "input",
      this.#inputValidationHandler.bind(this)
    );
    this.#form.addEventListener(
      "keydown",
      this.#formPreSubmitValidationHandler.bind(this)
    );
    this.#getSubmitButton().addEventListener(
      "click",
      this.#formPreSubmitValidationHandler.bind(this)
    );
  }

  removeFormValidationEventListeners() {
    this.#form.removeEventListener(
      "input",
      this.#inputValidationHandler.bind(this)
    );
    this.#form.removeEventListener(
      "keydown",
      this.#formPreSubmitValidationHandler.bind(this)
    );
    this.#getSubmitButton().removeEventListener(
      "click",
      this.#formPreSubmitValidationHandler.bind(this)
    );
  }

  enableValidation() {
    this.#toggleButtonStatus();
    this.#setFormValidationEventListeners();
  }
}

export default FormValidator;
