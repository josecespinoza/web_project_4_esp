import * as validate from "./validate.js";
import { page } from "./constants.js";

const formConfig = {
  formTemplateSelector: "#form-template",
  formSelector: ".form",
  formTitleSelector: ".form__title",
  formButtonSelector: ".button",
  formInputTemplateSelector: "#form__input-template",
  formInputSetSelector: ".form__input-set",
  formInputSelector: ".form__input",
  formInputsAreaSelector: ".form__inputs",
};

const createForm = (formTitle, buttonLabel, config = formConfig) => {
  const formTemplate = page.querySelector(config.formTemplateSelector);
  const newForm = formTemplate
    .cloneNode(true)
    .content.querySelector(config.formSelector);
  newForm.querySelector(config.formTitleSelector).textContent = formTitle;
  newForm.querySelector(config.formButtonSelector).textContent = buttonLabel;
  return newForm;
};

const createFormInputSet = (
  type,
  name,
  placeholder,
  isRequired,
  maxlength,
  minlength = 0,
  config = formConfig
) => {
  const formInputTemplate = page.querySelector(
    config.formInputTemplateSelector
  );
  const formInputSet = formInputTemplate
    .cloneNode("true")
    .content.querySelector(config.formInputSetSelector);
  const formInput = formInputSet.querySelector(config.formInputSelector);
  formInput.setAttribute("type", type);
  formInput.setAttribute("name", name);
  formInput.setAttribute("placeholder", placeholder);
  formInput.setAttribute("maxlength", maxlength);
  formInput.setAttribute("minlength", minlength);
  formInput.setAttribute("required", isRequired);
  return formInputSet;
};

const buildForm = (form, inputs, config = formConfig) => {
  const formInputsArea = form.querySelector(config.formInputsAreaSelector);
  inputs.forEach((input) => {
    formInputsArea.append(input);
  });
  validate.enableValidation(form);
  return form;
};

function setSubmitEventListener(form, handler) {
  form.addEventListener("submit", handler);
}

function removeSubmitEventListener(form, handler) {
  form.removeEventListener("submit", handler);
  validate.removeFormValidationEventListeners(form);
}

export {
  createForm,
  createFormInputSet,
  buildForm,
  setSubmitEventListener,
  removeSubmitEventListener,
};
