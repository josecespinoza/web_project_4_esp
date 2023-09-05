const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_location_form",
  inactiveButtonClass: "button_status_inactive",
  inputErrorClass: "form__input_status_error",
  errorClass: "form__input-error",
};

const enableValidationHandler = (evt, config) => {
  const form = evt.currentTarget;
  const inputElement = evt.target;
  const inputErrorElement = inputElement.nextElementSibling;
  inputErrorElement.textContent = evt.target.validationMessage;
  toggleButtonStatus(form, config);
};

const enableValidation = (form, config = validationConfig) => {
  form.addEventListener("input", (evt) => {
    enableValidationHandler(evt, config);
  });
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
  return inputs.every((input) => {
    return input.validity.valid;
  });
};
