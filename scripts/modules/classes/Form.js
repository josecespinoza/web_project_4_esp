import { page } from "../constants.js";
import { formConfig } from "../config.js";
import { FormValidator } from "./FormValidator.js";

class Form {
  constructor(
    formTitle,
    buttonLabel,
    inputSetList,
    submitEventHandler,
    config = formConfig
  ) {
    this._config = config;
    this._formTitle = formTitle;
    this._buttonLabel = buttonLabel;
    this._inputSetList = inputSetList;
    this._submitEventHandler = submitEventHandler;
    this._form = null;
    this._formValidator = null;
  }

  _getTemplate() {
    return page.querySelector(this._config.formTemplateSelector).cloneNode(true)
      .content;
  }

  _getInputsArea() {
    return this._form.querySelector(this._config.formInputsAreaSelector);
  }

  _setTitle(title) {
    this._form.querySelector(this._config.formTitleSelector).textContent =
      title;
  }

  _setButtonLabel(label) {
    this._form.querySelector(this._config.formButtonSelector).textContent =
      label;
  }

  _setInputs(inputSetList) {
    inputSetList.forEach((inputSet) => {
      this._getInputsArea().append(inputSet);
    });
  }

  _setSubmitEventListener(handler) {
    this._form.addEventListener("submit", handler);
    this._form.addEventListener("submit", () => {
      this._postSubmitEventHandler(handler);
    });
  }

  _postSubmitEventHandler(handler) {
    this._form.removeEventListener("submit", handler);
    //TODO removeEventListener of FormValidator
  }

  _enableValidation(form) {
    this._formValidator = new FormValidator(form);
    this._formValidator.enableValidation();
  }

  buildForm() {
    this._form = this._getTemplate().querySelector(this._config.formSelector);
    this._setTitle(this._formTitle);
    this._setButtonLabel(this._buttonLabel);
    this._setInputs(this._inputSetList);
    this._setSubmitEventListener(this._submitEventHandler);
    this._enableValidation(this._form);
    return this._form;
  }
}
export default Form;
