import { page } from "../helpers/constants.js";
import { formConfig } from "../helpers/config.js";

class Form {
  #config;
  #formTitle;
  #buttonLabel;
  #inputSetList;
  #form;

  constructor(
    formTitle,
    buttonLabel,
    inputSetList = null,
    config = formConfig
  ) {
    this.#config = config;
    this.#formTitle = formTitle;
    this.#buttonLabel = buttonLabel;
    this.#inputSetList = inputSetList;
    this.#form = null;
  }

  startLoader() {
    this.#getSubmitButton().textContent = "Guardando...";
    this.#getSubmitButton().classList.add(this.#config.submitLoadingClass);
  }

  stopLoader() {
    this.#getSubmitButton().textContent = "Guardado";
  }

  #getSubmitButton() {
    return this.#form.querySelector(this.#config.formButtonSelector);
  }

  #getTemplate() {
    return page.querySelector(this.#config.formTemplateSelector).cloneNode(true)
      .content;
  }

  #getInputsArea() {
    return this.#form.querySelector(this.#config.formInputsAreaSelector);
  }

  #setTitle(title) {
    this.#form.querySelector(this.#config.formTitleSelector).textContent =
      title;
  }

  #setButtonLabel(label) {
    this.#getSubmitButton().textContent = label;
  }

  #setInputs(inputSetList) {
    inputSetList.forEach((inputSet) => {
      this.#getInputsArea().append(inputSet);
    });
  }

  getFormElement() {
    return this.#form;
  }

  buildForm() {
    this.#form = this.#getTemplate().querySelector(this.#config.formSelector);
    this.#setTitle(this.#formTitle);
    this.#setButtonLabel(this.#buttonLabel);
    if (this.#inputSetList) {
      this.#setInputs(this.#inputSetList);
    }
    return this.#form;
  }
}
export default Form;
