import { popupConfig } from "../helpers/config.js";
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitEventHandler, form) {
    super(popupSelector, popupConfig);
    this._submitEventHandler = submitEventHandler;
    this._submitEventHandler = this._submitEventHandler.bind(this);
    this._postSubmitEventHandler = this._postSubmitEventHandler.bind(this);
    this._form = form;
  }

  _getInputValues() {
    return this._form.inputValues;
  }

  _modifyContentContainer() {
    super._modifyContentContainer(popupConfig.popupModifierFormClass);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitEventHandler);
    this._form.addEventListener("submit", this._postSubmitEventHandler);
  }

  _postSubmitEventHandler() {
    this._form.removeEventListener("submit", this._submitEventHandler);
    this._form.removeEventListener("submit", this._postSubmitEventHandler);
    this.close();
  }

  _setForm() {
    this._modifyContentContainer();
    this._getContentContainer().append(this._form);
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
    this._setForm();
  }
}

export default PopupWithForm;
