import {
  renderCards,
  renderUserInfo,
  renderAvatar,
  addCard,
  deleteCard,
  editUserInfo,
  editAvatar,
  enableFormValidationOn,
  openPopupWithForm,
  removeHTMLElement,
} from "./utils.js";
import {
  createEditAvatarForm,
  createEditProfileForm,
  createAddCardForm,
  createDeleteCardForm,
} from "./forms.js";

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
  const cardInfo = {
    link: targetForm.imageUrl.value,
    name: targetForm.title.value,
  };
  addCard(cardInfo).then((data) => {
    renderCards([data]);
  });
};

const handleDeleteCardButtonClick = (evt) => {
  const card = evt.target.closest(".destinations__item");
  const cardId = card.id.replace(/^id_/, "");
  const deleteCardForm = createDeleteCardForm();

  openPopupWithForm(deleteCardForm, (evt) => {
    evt.preventDefault();
    deleteCard(cardId).then(() => {
      removeHTMLElement(card);
    });
  });
};

export {
  handleEditAvatarButtonClick,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
  handleDeleteCardButtonClick,
};
