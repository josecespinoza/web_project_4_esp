import { popupConfig } from "../helpers/config.js";
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitEventHandler, formElement) {
    super(popupSelector, popupConfig);
    this._submitEventHandler = submitEventHandler;
    this._submitEventHandler = this._submitEventHandler.bind(this);
    this._postSubmitEventHandler = this._postSubmitEventHandler.bind(this);
    this._formElement = formElement;
  }

  _getInputValues() {
    return this._formElement.inputValues;
  }

  _modifyContentContainer() {
    super._modifyContentContainer(popupConfig.popupModifierFormClass);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._submitEventHandler);
    this._formElement.addEventListener("submit", this._postSubmitEventHandler);
  }

  _postSubmitEventHandler(evt) {
    this._formElement.removeEventListener("submit", this._submitEventHandler);
    this._formElement.removeEventListener(
      "submit",
      this._postSubmitEventHandler
    );
    this.close();
  }

  _setForm() {
    this._modifyContentContainer();
    this._getContentContainer().append(this._formElement);
  }

  _focusOnForm() {
    if (this._formElement.querySelector(".form__input").value) {
      this._formElement.querySelector(".button").focus();
    } else {
      this._formElement.querySelector(".form__input").focus();
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  open() {
    super.open();
    this._setForm();
    this._focusOnForm();
  }
}

export default PopupWithForm;
