import { page } from "../helpers/constants.js";
import { inputSetConfig } from "../helpers/config.js";

class InputSet {
  #type;
  #name;
  #placeholder;
  #isRequired;
  #maxlength;
  #minlength;
  #config;
  #inputSet;
  #input;
  constructor(data, config = inputSetConfig) {
    this.#type = data.type;
    this.#name = data.name;
    this.#placeholder = data.placeholder;
    this.#isRequired = data.isRequired;
    this.#maxlength = data.maxlength;
    this.#minlength = data.minlength;
    this.#config = config;
    this.#inputSet = null;
    this.#input = null;
  }

  #getTemplate() {
    return page
      .querySelector(this.#config.inputTemplateSelector)
      .cloneNode(true).content;
  }

  #mapInputAttributes() {
    this.#input.setAttribute("type", this.#type);
    this.#input.setAttribute("name", this.#name);
    this.#input.setAttribute("placeholder", this.#placeholder);
    this.#input.setAttribute("maxlength", this.#maxlength);
    this.#input.setAttribute("minlength", this.#minlength);
    this.#input.setAttribute("required", this.#isRequired);
  }

  setInputValue(value) {
    this.#input.value = value;
  }

  inputFocus() {
    this.#input.focus();
    this.#input.select();
  }

  buildFormInputSet() {
    this.#inputSet = this.#getTemplate().querySelector(
      this.#config.inputSetSelector
    );
    this.#input = this.#inputSet.querySelector(this.#config.inputSelector);
    this.#mapInputAttributes();
    return this.#inputSet;
  }
}

export default InputSet;
