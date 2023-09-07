const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_location_form",
  inactiveButtonClass: "button_status_inactive",
  inputErrorClass: "form__input_status_error",
  errorClass: "form__input-error",
};

const inputValidationHandler = (evt, config = validationConfig) => {
  const form = evt.currentTarget;
  const inputElement = evt.target;
  const inputErrorElement = inputElement.nextElementSibling;
  inputErrorElement.textContent = evt.target.validationMessage;
  toggleButtonStatus(form, config);
};

const formPreSubmitValidationHandler = (evt, config = validationConfig) => {
  if (!formIsValid(evt.currentTarget, config)) {
    evt.preventDefault();
  }
};

const setFormValidationEventListeners = (form, config = validationConfig) => {
  form.addEventListener("input", inputValidationHandler);
  form.addEventListener("keydown", formPreSubmitValidationHandler);
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.addEventListener("click", formPreSubmitValidationHandler);
};

const removeFormValidationEventListeners = (
  form,
  config = validationConfig
) => {
  form.removeEventListener("input", inputValidationHandler);
  form.removeEventListener("keydown", formPreSubmitValidationHandler);
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.removeEventListener("click", formPreSubmitValidationHandler);
};

const enableValidation = (form, config = validationConfig) => {
  toggleButtonStatus(form, config);
  setFormValidationEventListeners(form, config);
};

const toggleButtonStatus = (form, config) => {
  const saveButton = form.querySelector(config.submitButtonSelector);
  if (formIsValid(form, config)) {
    saveButton.classList.remove(config.inactiveButtonClass);
  } else {
    saveButton.classList.add(config.inactiveButtonClass);
  }
};

const formIsValid = (form, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  return inputs.every((input, index) => {
    return input.validity.valid;
  });
};

export { enableValidation, removeFormValidationEventListeners };
