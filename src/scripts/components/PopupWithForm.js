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

  setEventListeners(closeOnSubmit = false) {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._submitEventHandler);
    this._formElement.addEventListener("submit", (evt) => {
      this._postSubmitEventHandler(evt, closeOnSubmit);
    });
  }

  _postSubmitEventHandler(evt, closeOnSubmit) {
    this._formElement.removeEventListener("submit", this._submitEventHandler);
    this._formElement.removeEventListener(
      "submit",
      this._postSubmitEventHandler
    );
    closeOnSubmit && this.close();
  }

  _setForm() {
    this._modifyContentContainer();
    this._getContentContainer().append(this._formElement);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  open() {
    super.open();
    this._setForm();
  }
}

export default PopupWithForm;
