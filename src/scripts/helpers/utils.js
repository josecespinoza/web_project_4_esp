import { globalConfig } from "./config.js";
import { page } from "./constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";

const setCurrentUserId = (userId) => {
  sessionStorage.setItem("userId", userId);
};

const getCurrentUserId = () => {
  return sessionStorage.getItem("userId");
};

const enableFormValidationOn = (form) => {
  const formValidator = new FormValidator(form);
  formValidator.enableValidation();
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

const isCardLiked = (cardData) => {
  return cardData.likes.some((user) => {
    return user._id === getCurrentUserId();
  });
};

const isCardOwner = (cardData) => {
  return cardData.owner._id === getCurrentUserId();
};

const removeHTMLElement = (htmlElement) => {
  if (htmlElement) htmlElement.remove();
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
  createPopupWithImage,
  isCardLiked,
  isCardOwner,
  setCurrentUserId,
  getCurrentUserId,
};
