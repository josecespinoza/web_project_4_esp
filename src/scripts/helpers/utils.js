import { globalConfig, sectionConfig, apiConfig } from "./config.js";
import Card from "../components/Card.js";
import Form from "../components/Form.js";
import InputSet from "../components/InputSet.js";
import Section from "../components/Section.js";
import Avatar from "../components/Avatar.js";
import UserInfo from "../components/UserInfo.js";
import {
  inputSetAvatarData,
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

const loadUserInfo = () => {
  apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.userInfoResource,
    apiConfig.getMethod
  )
    .then((data) => {
      renderUserInfo(data.name, data.about);
      renderAvatar(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
};

const editAvatar = (imageUrl) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.avatarResource,
    apiConfig.patchMethod,
    {
      avatar: imageUrl,
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const editUserInfo = (name, about) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.userInfoResource,
    apiConfig.patchMethod,
    {
      name,
      about,
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderAvatar = (imageUrl) => {
  const avatar = new Avatar(globalConfig.profileAvatarSelector);
  avatar.setAvatarImageUrl(imageUrl);
};

const renderUserInfo = (name, about) => {
  const userInfo = new UserInfo(
    globalConfig.profileNameSelector,
    globalConfig.profileOccupationSelector
  );
  userInfo.setUserInfo(name, about);
};

const apiRequestsHandler = (baseUrl, resource, method, body) => {
  const api = new Api({
    baseUrl: `${baseUrl}${resource}`,
    headers: {
      authorization: `${apiConfig.token}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const apiMethods = {
    GET: api.get,
    PATCH: api.patch,
  };

  return apiMethods[method]();
};

const handleEditAvatarButtonClick = () => {
  const editAvatarForm = createEditAvatarForm();
  enableFormValidationOn(editAvatarForm);
  openPopupWithForm(editAvatarForm, handleAvatarEditSubmit);
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

const handleAvatarEditSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  editAvatar(targetForm.avatarUrl.value).then((data) => {
    renderAvatar(data.avatar);
  });
};

const handleProfileEditSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  editUserInfo(targetForm.name.value, targetForm.aboutMe.value).then((data) => {
    renderUserInfo(data.name, data.about);
  });
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

const createEditAvatarForm = () => {
  const inputSets = [];
  const inputSetAvatarSrc = new InputSet(inputSetAvatarData);
  inputSets.push(inputSetAvatarSrc.buildFormInputSet());
  const avatar = new Avatar(globalConfig.profileAvatarSelector);
  inputSetAvatarSrc.setInputValue(avatar.getAvatarImageUrl());
  const newForm = new Form("Cambiar foto de perfil", "Guardar", inputSets);
  return newForm.buildForm();
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
  handleEditAvatarButtonClick,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
  loadUserInfo,
  editUserInfo,
};
