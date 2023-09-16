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

export { cardConfig, validationConfig };
