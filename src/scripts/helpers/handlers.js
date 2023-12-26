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
  renderPopUpWithForm(editAvatarForm, handleAvatarEditSubmit);
};

const handleEditProfileButtonClick = () => {
  const editProfileForm = createEditProfileForm();
  renderPopUpWithForm(editProfileForm, handleProfileEditSubmit);
};

const handleAddCardButtonClick = () => {
  const addCardForm = createAddCardForm();
  renderPopUpWithForm(addCardForm, handleAddCardFormSubmit);
};

const handleAvatarEditSubmit = (evt, form, popupWithForm) => {
  evt.preventDefault();
  form.startLoader();
  const formElement = form.getFormElement();
  updateAvatar(formElement.avatarUrl.value).then((data) => {
    renderAvatar(data.avatar);
    form.stopLoader();
    popupWithForm.close();
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

const handleAddCardFormSubmit = (evt, form, popupWithForm) => {
  evt.preventDefault();
  form.startLoader();
  const formElement = form.getFormElement();
  addCard(formElement.title.value, formElement.imageUrl.value).then((data) => {
    renderCards([data], handleDeleteCardButtonClick, handleLikeCardButtonClick);
    form.stopLoader();
    popupWithForm.close();
  });
};

const handleDeleteCardButtonClick = (evt, card) => {
  evt.preventDefault();
  const deleteCardForm = createDeleteCardForm();
  renderPopUpWithForm(deleteCardForm, (submitEvt, form, popupWithForm) => {
    handleDeleteCardSubmit(submitEvt, card, form, popupWithForm);
  });
};

const handleDeleteCardSubmit = (evt, card, form, popupWithForm) => {
  evt.preventDefault();
  form.startLoader();
  deleteCard(card.getCardId()).then(() => {
    form.stopLoader();
    removeHTMLElement(card.getCardElement());
    popupWithForm.close();
  });
};

const handleLikeCardButtonClick = (evt, card) => {
  if (card._status === "liked") {
    dislikeCard(card.getCardId())
      .then((data) => {
        card.setLikesCounter(data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(card.getCardId())
      .then((data) => {
        card.setLikesCounter(data.likes.length);
      })
      .catch((err) => {
        console.log(err);
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
