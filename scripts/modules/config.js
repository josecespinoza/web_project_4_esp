const cardConfig = {
  cardTemplateSelector: "#destinations__item-template",
  cardSelector: ".destinations__item",
  cardNameSelector: ".destination__name",
  cardImageSelector: ".destination__photo",
  likeButtonSelector: ".button_action_like .button__icon",
  deleteButtonSelector: ".button__icon_action_delete",
  popUpTemplateSelector: "#destination-popup-template",
  popUpPhotoSelector: ".destination-popup__photo",
  popUpDescSelector: ".destination-popup__description",
  notLikedButtonClass: "button__icon_action_like",
  isLikedButtonClass: "button__icon_action_liked",
};

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_location_form",
  inactiveButtonClass: "button_status_inactive",
  inputErrorClass: "form__input_status_error",
  errorClass: "form__input-error",
};

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

const inputSetConfig = {
  inputTemplateSelector: "#form__input-template",
  inputSetSelector: ".form__input-set",
  inputSelector: ".form__input",
};

export { cardConfig, validationConfig, formConfig, inputSetConfig };
