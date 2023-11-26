import { globalConfig } from "./config.js";
import Card from "./classes/Card.js";
import Form from "./classes/Form.js";
import InputSet from "./classes/InputSet.js";
import Modal from "./classes/Modal.js";
import {
  inputSetAboutMeData,
  inputSetImageUrlData,
  inputSetNameData,
  inputSetTitleData,
  page,
} from "./constants.js";
import Section from "./classes/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "./classes/FormValidator.js";

const modalHandler = new Modal();

const openModal = (content) => {
  modalHandler.setContent(content);
  modalHandler.buildModal();
  modalHandler.open();
};

const closeModal = () => {
  modalHandler.close();
};

function createEditProfileForm() {
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
  const newForm = new Form(
    "Editar Perfil",
    "Guardar",
    inputSets,
    handleProfileEditSubmit
  );

  return newForm.buildForm();
}

function handleEditProfileButtonClick() {
  const editProfileForm = createEditProfileForm();
  const formValidator = new FormValidator(editProfileForm);
  formValidator.enableValidation();
  const popUpWithForm = new PopupWithForm(
    globalConfig.popupSelector,
    handleProfileEditSubmit,
    editProfileForm
  );
  popUpWithForm.buildPopup();
  popUpWithForm.setEventListeners();
  popUpWithForm.open();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const targetForm = evt.target;
  page.querySelector(globalConfig.profileNameSelector).textContent =
    targetForm.name.value;
  page.querySelector(globalConfig.profileOccupationSelector).textContent =
    targetForm.aboutMe.value;
  closeModal();
}

function handleAddCardButtonClick() {
  const inputSets = [];
  const inputSetTitle = new InputSet(inputSetTitleData);
  const inputSetImageUrl = new InputSet(inputSetImageUrlData);
  inputSets.push(
    inputSetTitle.buildFormInputSet(),
    inputSetImageUrl.buildFormInputSet()
  );
  const newCardForm = new Form(
    "Nuevo Lugar",
    "Guardar",
    inputSets,
    handleAddCardFormSubmit
  );
  openModal(newCardForm.buildForm());
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const targetForm = evt.target;
  const cardTitle = targetForm.title;
  const cardImageUrl = targetForm.imageUrl;
  const card = new Card(cardTitle.value, cardImageUrl.value);
  const destinationsList = page.querySelector(
    globalConfig.cardsContainerSelector
  );
  destinationsList.prepend(card.buildCard());
  closeModal();
}

export { handleEditProfileButtonClick, handleAddCardButtonClick };
