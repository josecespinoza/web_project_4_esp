import { globalConfig, sectionConfig, apiConfig } from "./config.js";
import Card from "../components/Card.js";
import Form from "../components/Form.js";
import InputSet from "../components/InputSet.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  inputSetAboutMeData,
  inputSetImageUrlData,
  inputSetNameData,
  inputSetTitleData,
  page,
} from "./constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

const apiRequestsHandler = (baseUrl, resource, method) => {
  const api = new Api({
    baseUrl: `${baseUrl}${resource}`,
    headers: {
      authorization: `${apiConfig.token}`,
    },
  });

  const apiMethods = {
    GET: api.get,
    PATCH: api.patch,
  };

  return apiMethods[method]();
};

const loadUserInfo = () => {
  apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.userInfoResource,
    apiConfig.getMethod
  )
    .then((data) => {
      renderUserInfo(data.name, data.about);
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderUserInfo = (name, about) => {
  const userInfo = new UserInfo(
    globalConfig.profileNameSelector,
    globalConfig.profileOccupationSelector
  );
  userInfo.setUserInfo(name, about);
};

const handleEditProfileButtonClick = () => {
  const editProfileForm = createEditProfileForm();
  enableFormValidationOn(editProfileForm);
  openPopupWithForm(editProfileForm, handleProfileEditSubmit);
};

const handleAddCardButtonClick = () => {
  const addCardForm = createAddCardForm();
  enableFormValidationOn(addCardForm);
  openPopupWithForm(addCardForm, handleAddCardFormSubmit);
};

const handleProfileEditSubmit = (evt) => {
  evt.preventDefault();
  const userInfo = new UserInfo(
    globalConfig.profileNameSelector,
    globalConfig.profileOccupationSelector
  );
  const targetForm = evt.target;
  renderUserInfo(targetForm.name.value, targetForm.aboutMe.value);
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  renderCards({
    link: targetForm.imageUrl.value,
    name: targetForm.title.value,
  });
};

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

const createEditProfileForm = () => {
  const inputSets = [];
  const inputSetName = new InputSet(inputSetNameData);
  const inputSetAboutMe = new InputSet(inputSetAboutMeData);
  inputSets.push(
    inputSetName.buildFormInputSet(),
    inputSetAboutMe.buildFormInputSet()
  );
  const userInfo = new UserInfo(
    globalConfig.profileNameSelector,
    globalConfig.profileOccupationSelector
  );
  inputSetName.setInputValue(userInfo.getUserInfo().userName);
  inputSetAboutMe.setInputValue(userInfo.getUserInfo().userJob);
  const newForm = new Form("Editar Perfil", "Guardar", inputSets);

  return newForm.buildForm();
};

const createAddCardForm = () => {
  const inputSets = [];
  const inputSetTitle = new InputSet(inputSetTitleData);
  const inputSetImageUrl = new InputSet(inputSetImageUrlData);
  inputSets.push(
    inputSetTitle.buildFormInputSet(),
    inputSetImageUrl.buildFormInputSet()
  );
  const newCardForm = new Form("Nuevo Lugar", "Guardar", inputSets);
  return newCardForm.buildForm();
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

const createCard = (cardName, cardLink, cardClickEventHandler) => {
  const card = new Card(cardName, cardLink, cardClickEventHandler);
  return card.buildCard();
};

const renderCards = (...cards) => {
  const cardsSection = new Section(
    {
      items: cards,
      renderer: (card) => {
        const popup = createPopupWithImage(card.link, card.name);
        const cardElement = createCard(card.name, card.link, popup.open);
        cardsSection.addItem(cardElement, sectionConfig.additionTypePrepend);
      },
    },
    globalConfig.cardsContainerSelector
  );
  cardsSection.renderer();
};

const setPageButtonHandler = (buttonSelector, clickEventHandler) => {
  page
    .querySelector(buttonSelector)
    .addEventListener("click", clickEventHandler);
};

export {
  setPageButtonHandler,
  renderCards,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
  loadUserInfo,
};
