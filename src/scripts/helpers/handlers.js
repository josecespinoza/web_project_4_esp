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
  updateAvatar(targetForm.avatarUrl.value).then((data) => {
    renderAvatar(data.avatar);
  });
};

const handleProfileEditSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  updateUserInfo(targetForm.name.value, targetForm.aboutMe.value).then(
    (data) => {
      renderUserInfo(data.name, data.about);
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
    renderCards([data], handleDeleteCardButtonClick);
  });
};

const handleDeleteCardButtonClick = (evt) => {
  const card = evt.target.closest(".destinations__item");
  const cardId = card.id.replace(/^id_/, "");
  const deleteCardForm = createDeleteCardForm();
  const formPopup = createPopupWithForm(deleteCardForm, (evt) => {
    evt.preventDefault();
    deleteCard(cardId).then(() => {
      removeHTMLElement(card);
    });
  });
  formPopup.open();
};

export {
  handleEditAvatarButtonClick,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
  handleDeleteCardButtonClick,
};
