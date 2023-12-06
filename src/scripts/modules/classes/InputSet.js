import { page } from "../constants.js";
import { inputSetConfig } from "../config.js";

class InputSet {
  constructor(data, config = inputSetConfig) {
    this._type = data.type;
    this._name = data.name;
    this._placeholder = data.placeholder;
    this._isRequired = data.isRequired;
    this._maxlength = data.maxlength;
    this._minlength = data.minlength;
    this._config = config;
    this._inputSet = null;
    this._input = null;
  }

  _getTemplate() {
    return page
      .querySelector(this._config.inputTemplateSelector)
      .cloneNode(true).content;
  }

  _mapInputAttributes() {
    this._input.setAttribute("type", this._type);
    this._input.setAttribute("name", this._name);
    this._input.setAttribute("placeholder", this._placeholder);
    this._input.setAttribute("maxlength", this._maxlength);
    this._input.setAttribute("minlength", this._minlength);
    this._input.setAttribute("required", this._isRequired);
  }

  setInputValue(value) {
    this._input.value = value;
  }

  inputFocus() {
    this._input.focus();
    this._input.select();
  }

  buildFormInputSet() {
    this._inputSet = this._getTemplate().querySelector(
      this._config.inputSetSelector
    );
    this._input = this._inputSet.querySelector(this._config.inputSelector);
    this._mapInputAttributes();
    return this._inputSet;
  }
}

export default InputSet;
