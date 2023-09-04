const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_location_form",
  inactiveButtonClass: "button_status_inactive",
  inputErrorClass: "form__input_status_error",
  errorClass: "form__input-error",
};

const enableValidationHandler = (evt) => {
  console.log(evt.target);
};

const enableValidation = (config, form) => {
  form.addEventListener("input", enableValidationHandler);
};
