import { globalConfig, sectionConfig, apiConfig } from "./config.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Avatar from "../components/Avatar.js";
import UserInfo from "../components/UserInfo.js";
import { page } from "./constants.js";
import { handleDeleteCardButtonClick } from "./handlers.js";
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

const loadCards = () => {
  apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.cardResource,
    apiConfig.getMethod
  )
    .then((data) => {
      renderCards(data, sectionConfig.additionTypeAppend);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addCard = ({ name, link }) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.cardResource,
    apiConfig.postMethod,
    {
      name,
      link,
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteCard = (cardId) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    `${apiConfig.cardResource}/${cardId}`,
    apiConfig.deleteMethod
  );
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
    POST: api.post,
    PATCH: api.patch,
    DELETE: api.delete,
  };

  return apiMethods[method]();
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

const renderCards = (cards, appendType = sectionConfig.additionTypePrepend) => {
  const cardsSection = new Section(
    {
      items: cards,
      renderer: (card) => {
        const cardPopup = createPopupWithImage(card.link, card.name);
        const cardElement = createCard(
          card._id,
          card.name,
          card.link,
          cardPopup.open,
          handleDeleteCardButtonClick
        );
        cardsSection.addItem(cardElement, appendType);
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
  removeHTMLElement,
  renderCards,
  loadUserInfo,
  loadCards,
  addCard,
  deleteCard,
  editAvatar,
  editUserInfo,
  renderAvatar,
  renderUserInfo,
  enableFormValidationOn,
  openPopupWithForm,
};
