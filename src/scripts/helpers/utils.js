import { globalConfig } from "./config.js";
import { page } from "./constants.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";

const enableFormValidationOn = (form) => {
  const formValidator = new FormValidator(form);
  formValidator.enableValidation();
};

const openPopupWithForm = (form, submitHandler) => {
  const popUpWithForm = new PopupWithForm(
    globalConfig.popupSelector,
    submitHandler,
    form
  );
  popUpWithForm.buildPopup();
  popUpWithForm.setEventListeners();
  popUpWithForm.open();
};

const createPopupWithImage = (imageUrl, description) => {
  const imagePopup = new PopupWithImage(globalConfig.popupSelector, {
    imageUrl,
    description,
  });
  imagePopup.buildPopup();
  imagePopup.setEventListeners();
  return imagePopup;
};

const createCard = (
  cardId,
  cardName,
  cardLink,
  cardClickEventHandler,
  cardDeleteEventHandler
) => {
  const card = new Card(
    cardId,
    cardName,
    cardLink,
    cardClickEventHandler,
    cardDeleteEventHandler
  );
  return card.buildCard();
};

const removeHTMLElement = (element) => {
  element.remove();
};

const setPageButtonHandler = (buttonSelector, clickEventHandler) => {
  page
    .querySelector(buttonSelector)
    .addEventListener("click", clickEventHandler);
};

export {
  setPageButtonHandler,
  removeHTMLElement,
  enableFormValidationOn,
  openPopupWithForm,
  createPopupWithImage,
  createCard,
};
