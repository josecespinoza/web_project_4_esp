import { globalConfig } from "./config.js";
import Card from "./classes/Card.js";
import Form from "./classes/Form.js";
import InputSet from "./classes/InputSet.js";
import {
  inputSetAboutMeData,
  inputSetImageUrlData,
  inputSetNameData,
  inputSetTitleData,
  page,
} from "./constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "./classes/FormValidator.js";

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
  const targetForm = evt.target;
  page.querySelector(globalConfig.profileNameSelector).textContent =
    targetForm.name.value;
  page.querySelector(globalConfig.profileOccupationSelector).textContent =
    targetForm.aboutMe.value;
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const targetForm = evt.target;
  const card = createCard(targetForm.title, targetForm.imageUrl);
  const destinationsList = page.querySelector(
    globalConfig.cardsContainerSelector
  );
  destinationsList.prepend(card);
};

const createCard = (title, imageUrl) => {
  const card = new Card(title, imageUrl);
  card.buildCard();
  return card;
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
  inputSetName.setInputValue(
    page.querySelector(globalConfig.profileNameSelector).textContent
  );
  inputSetAboutMe.setInputValue(
    page.querySelector(globalConfig.profileOccupationSelector).textContent
  );
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

export { handleEditProfileButtonClick, handleAddCardButtonClick };
