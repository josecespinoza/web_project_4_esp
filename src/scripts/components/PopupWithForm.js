import { popupConfig, formConfig } from "../helpers/config.js";
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  #submitEventHandler;
  #formElement;

  constructor(popupSelector, submitEventHandler, formElement) {
    super(popupSelector, popupConfig);
    this.#submitEventHandler = submitEventHandler;
    this.#formElement = formElement;
  }

  #modifyContentContainer() {
    super._modifyContentContainer(popupConfig.popupModifierFormClass);
  }

  setEventListeners() {
    super.setEventListeners();
    this.#formElement.addEventListener("submit", this.#submitEventHandler);
    this.#formElement.addEventListener(
      "submit",
      this.#postSubmitEventHandler.bind(this)
    );
  }

  #postSubmitEventHandler(evt) {
    this.#formElement.removeEventListener("submit", this.#submitEventHandler);
    this.#formElement.removeEventListener(
      "submit",
      this.#postSubmitEventHandler
    );
  }

  #setForm() {
    this.#modifyContentContainer();
    super._getContentContainer().append(this.#formElement);
  }

  #focusOnForm() {
    const firstInput = this.#formElement.querySelector(
      formConfig.formInputSelector
    );
    const firstButton = this.#formElement.querySelector(
      formConfig.formButtonSelector
    );
    if (!firstInput || firstInput.value) {
      firstButton.focus();
    } else {
      firstInput.focus();
    }
  }

  close() {
    super.close();
    this.#formElement.reset();
  }

  open() {
    super.open();
    this.#setForm();
    this.#focusOnForm();
  }
}

export default PopupWithForm;
