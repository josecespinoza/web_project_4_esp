import { enableValidation } from "../validate.js";
import { page } from "./constants.js";

function createForm(formTitle, buttonLabel) {
  const formTemplate = page.querySelector("#form-template");
  const newForm = formTemplate.cloneNode(true).content.querySelector(".form");
  newForm.querySelector(".form__title").textContent = formTitle;
  return newForm;
}

function createFormInputSet(
  type,
  name,
  placeholder,
  isRequired,
  maxlength,
  minlength = 0
) {
  const formInputTemplate = page.querySelector("#form__input-template");
  const formInputSet = formInputTemplate
    .cloneNode("true")
    .content.querySelector(".form__input-set");
  const formInput = formInputSet.querySelector(".form__input");
  formInput.setAttribute("type", type);
  formInput.setAttribute("name", name);
  formInput.setAttribute("placeholder", placeholder);
  formInput.setAttribute("maxlength", maxlength);
  formInput.setAttribute("minlength", minlength);
  formInput.setAttribute("required", isRequired);
  return formInputSet;
}

function buildForm(form, ...inputs) {
  const formInputsArea = form.querySelector(".form__inputs");
  inputs.forEach((input) => {
    formInputsArea.append(input);
  });
  enableValidation(form);
  return form;
}

export { createForm, createFormInputSet, buildForm };
