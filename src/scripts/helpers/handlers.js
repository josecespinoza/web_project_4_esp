import {
  renderCards,
  renderUserInfo,
  renderAvatar,
  addCard,
  editUserInfo,
  editAvatar,
  enableFormValidationOn,
  openPopupWithForm,
} from "./utils.js";
import {
  createEditAvatarForm,
  createEditProfileForm,
  createAddCardForm,
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
    renderCards(data);
  });
};

export {
  handleEditAvatarButtonClick,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
};
