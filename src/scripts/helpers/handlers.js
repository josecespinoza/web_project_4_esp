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
import { renderAvatar, renderUserInfo, renderCards } from "./renders.js";
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
  enableFormValidationOn(editProfileForm);
  const formPopup = createPopupWithForm(
    editProfileForm,
    handleProfileEditSubmit
  );
  formPopup.open();
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
  updateAvatar(targetForm.avatarUrl.value)
    .then((data) => {
      renderAvatar(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleProfileEditSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  updateUserInfo(targetForm.name.value, targetForm.aboutMe.value)
    .then((data) => {
      renderUserInfo(data.name, data.about);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  const cardInfo = {
    link: targetForm.imageUrl.value,
    name: targetForm.title.value,
  };
  addCard(cardInfo)
    .then((data) => {
      renderCards(
        [data],
        handleDeleteCardButtonClick,
        handleLikeCardButtonClick
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleDeleteCardButtonClick = (evt, card) => {
  const deleteCardForm = createDeleteCardForm();
  const formPopup = createPopupWithForm(deleteCardForm, (evt) => {
    evt.preventDefault();
    deleteCard(card.getCardId())
      .then(() => {
        removeHTMLElement(card.getCardElement());
      })
      .catch((err) => {
        console.log(err);
      });
  });
  formPopup.open();
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
