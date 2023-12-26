import { cardConfig } from "./config.js";
import {
  enableFormValidationOn,
  createPopupWithForm,
  removeHTMLElement,
} from "./utils.js";
import {
  createEditAvatarForm,
  createEditProfileForm,
  createAddCardForm,
  createDeleteCardForm,
} from "./forms.js";
import {
  renderAvatar,
  renderUserInfo,
  renderCards,
  renderPopUpWithForm,
} from "./renders.js";
import {
  addCard,
  deleteCard,
  updateAvatar,
  updateUserInfo,
  likeCard,
  dislikeCard,
} from "./requests.js";

const handleEditAvatarButtonClick = () => {
  const editAvatarForm = createEditAvatarForm();
  enableFormValidationOn(editAvatarForm);
  const formPopup = createPopupWithForm(editAvatarForm, handleAvatarEditSubmit);
  formPopup.open();
};

const handleEditProfileButtonClick = () => {
  const editProfileForm = createEditProfileForm();
  renderPopUpWithForm(editProfileForm, handleProfileEditSubmit);
};

const handleAddCardButtonClick = () => {
  const addCardForm = createAddCardForm();
  enableFormValidationOn(addCardForm);
  const formPopup = createPopupWithForm(addCardForm, handleAddCardFormSubmit);
  formPopup.open();
};

const handleAvatarEditSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  updateAvatar(targetForm.avatarUrl.value).then((data) => {
    renderAvatar(data.avatar);
  });
};

const handleProfileEditSubmit = (evt, form, popupWithForm) => {
  evt.preventDefault();
  form.startLoader();
  const formElement = form.getFormElement();
  updateUserInfo(formElement.name.value, formElement.aboutMe.value).then(
    (data) => {
      renderUserInfo(data.name, data.about);
      form.stopLoader();
      popupWithForm.close();
    }
  );
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  const cardInfo = {
    link: targetForm.imageUrl.value,
    name: targetForm.title.value,
  };
  addCard(cardInfo).then((data) => {
    renderCards([data], handleDeleteCardButtonClick, handleLikeCardButtonClick);
  });
};

const handleDeleteCardButtonClick = (evt, card) => {
  const deleteCardForm = createDeleteCardForm();
  const formPopup = createPopupWithForm(deleteCardForm, (evt) => {
    evt.preventDefault();
    deleteCard(card.getCardId()).then(() => {
      removeHTMLElement(card.getCardElement());
    });
  });
  formPopup.open();
};

const handleLikeCardButtonClick = (evt, card) => {
  if (card._status === "liked") {
    dislikeCard(card.getCardId()).then((data) => {
      card.setLikesCounter(data.likes.length);
    });
  } else {
    likeCard(card.getCardId()).then((data) => {
      card.setLikesCounter(data.likes.length);
    });
  }
  card.toggleLikeButton();
};

export {
  handleEditAvatarButtonClick,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
  handleDeleteCardButtonClick,
  handleLikeCardButtonClick,
};
