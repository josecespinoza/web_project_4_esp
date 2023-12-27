const cardConfig = {
  cardTemplateSelector: "#destinations__item-template",
  cardSelector: ".destinations__item",
  cardNameSelector: ".destination__name",
  cardImageSelector: ".destination__photo",
  likeButtonSelector: ".button_action_like",
  likeButtonIconSelector: ".button_action_like .button__icon",
  likeCounterSelector: ".like .like__counter",
  deleteButtonSelector: ".button_action_delete",
  deleteButtonIconSelector: "button_action_delete .button__icon",
  popUpTemplateSelector: "#destination-popup-template",
  popUpSelector: ".destination-popup",
  popUpPhotoSelector: ".destination-popup__photo",
  popUpDescSelector: ".destination-popup__description",
  notLikedButtonClass: "button__icon_action_like",
  isLikedButtonClass: "button__icon_action_liked",
  likedStatus: "liked",
  unlikedStatus: "unliked",
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
  submitLoadingClass: "button_status_loading",
};

const inputSetConfig = {
  inputTemplateSelector: "#form__input-template",
  inputSetSelector: ".form__input-set",
  inputSelector: ".form__input",
};

const modalConfig = {
  modalTemplateSelector: "#modal-template",
  modalSelector: ".modal-container",
  modalContentSelector: ".modal-container__content",
  modalBackdropSelector: ".modal-container__backdrop",
  modalCloseButtonSelector: ".button__icon_action_close",
  modalModifierFormClass: "modal-container__form",
  modalClosedStateClass: "modal-container_state_closed",
  modalOpenedStateClass: "modal-container_state_opened",
  modalClosingTimeInMs: "300",
  formClass: "form",
};

const popupConfig = {
  popupTemplateSelector: "#popup-template",
  popupSelector: ".popup",
  popupContentSelector: ".popup__content",
  popupBackdropSelector: ".popup__backdrop",
  popupPhotoSelector: ".popup__photo",
  popupDescSelector: ".popup__description",
  popupImageTplSelector: "#popupImage-template",
  popupCloseButtonSelector: ".button__icon_action_close",
  popupModifierFormClass: "popup__content_type_form",
  popupModifierImageClass: "popup__content_type_image",
  popupClosedStateClass: "popup_state_closed",
  popupOpenedStateClass: "popup_state_opened",
  popupClosingTimeInMs: "300",
  formClass: "form",
};

const globalConfig = {
  pageSelector: ".page",
  editProfileButtonSelector: ".button_action_edit.button_location_profile-info",
  editAvatarButtonSelector:
    ".button_action_edit.button_location_profile-avatar",
  addCardButtonSelector: ".button_action_add",
  cardsContainerSelector: ".destinations__list",
  profileAvatarSelector: ".profile__avatar",
  profileNameSelector: ".profile__name",
  profileOccupationSelector: ".profile__occupation",
  popupSelector: ".popup",
};

const sectionConfig = {
  additionTypeAppend: "append",
  additionTypePrepend: "prepend",
};

const apiConfig = {
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10",
  token: "f0b3f439-acc1-4da4-ab9f-34df2f51e340",
  userInfoResource: "/users/me",
  avatarResource: "/users/me/avatar",
  cardResource: "/cards",
  likeResource: "/cards/likes",
  getMethod: "GET",
  postMethod: "POST",
  putMethod: "PUT",
  patchMethod: "PATCH",
  deleteMethod: "DELETE",
};

export {
  cardConfig,
  validationConfig,
  formConfig,
  inputSetConfig,
  modalConfig,
  popupConfig,
  globalConfig,
  sectionConfig,
  apiConfig,
};
