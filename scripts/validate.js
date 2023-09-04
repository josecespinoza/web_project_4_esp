const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_location_form",
  inactiveButtonClass: "button_status_inactive",
  inputErrorClass: "form__input_status_error",
  errorClass: "form__input-error",
};

const showInputError = () => {};

const enableValidationHandler = (evt) => {
  const inputElement = evt.target;
  inputElement.nextElementSibling.textContent = evt.target.validationMessage;
};

const enableValidation = (config, form) => {
  form.addEventListener("input", enableValidationHandler);
};
