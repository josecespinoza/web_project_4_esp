import { page } from "../helpers/constants.js";
import { formConfig } from "../helpers/config.js";

class Form {
  constructor(formTitle, buttonLabel, inputSetList, config = formConfig) {
    this._config = config;
    this._formTitle = formTitle;
    this._buttonLabel = buttonLabel;
    this._inputSetList = inputSetList;
    this._form = null;
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

  buildForm() {
    this._form = this._getTemplate().querySelector(this._config.formSelector);
    this._setTitle(this._formTitle);
    this._setButtonLabel(this._buttonLabel);
    this._setInputs(this._inputSetList);
    return this._form;
  }
}
export default Form;
