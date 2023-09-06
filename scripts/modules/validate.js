const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_location_form",
  inactiveButtonClass: "button_status_inactive",
  inputErrorClass: "form__input_status_error",
  errorClass: "form__input-error",
};

const inputValidationHandler = (evt, config) => {
  const form = evt.currentTarget;
  const inputElement = evt.target;
  const inputErrorElement = inputElement.nextElementSibling;
  inputErrorElement.textContent = evt.target.validationMessage;
  toggleButtonStatus(form, config);
};

const formPreSubmitValidationHandler = (evt, config) => {
  if (!formIsValid(evt.currentTarget, config)) {
    evt.preventDefault();
  }
};

const setFormEventListeners = (form, config) => {
  form.addEventListener("input", (evt) => {
    inputValidationHandler(evt, config);
  });
  form.addEventListener("keydown", (evt) => {
    if (evt.key.toLowerCase() === "enter") {
      formPreSubmitValidationHandler(evt, config);
    }
  });
  const submitButton = form.querySelector(config.submitButtonSelector);
  submitButton.addEventListener("click", (evt) => {
    formPreSubmitValidationHandler(evt, config);
  });
};

const enableValidation = (form, config = validationConfig) => {
  toggleButtonStatus(form, config);
  setFormEventListeners(form, config);
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

export { enableValidation };
