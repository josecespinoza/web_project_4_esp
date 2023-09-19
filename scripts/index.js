import {
  page,
  initialCards,
  inputSetNameData,
  inputSetAboutMeData,
  inputSetTitleData,
  inputSetImageUrlData,
} from "./modules/constants.js";
import Card from "./modules/classes/Card.js";
import Form from "./modules/classes/Form.js";
import InputSet from "./modules/classes/InputSet.js";
import Modal from "./modules/classes/Modal.js";

const editButton = page.querySelector(".button_action_edit");
const addCardButton = page.querySelector(".button_action_add");
const modalHandler = new Modal();
editButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);

loadDestinationCards(...initialCards);

function loadDestinationCards(...destinationCards) {
  const destinationsContainer = document.querySelector(".destinations__list");
  destinationCards.forEach((destination) => {
    const card = new Card(destination.name, destination.link);
    const cardElement = card.buildCard();
    destinationsContainer.append(cardElement);
  });
}

function handleEditProfileButtonClick() {
  const inputSets = [];
  const inputSetName = new InputSet(inputSetNameData);
  const inputSetAboutMe = new InputSet(inputSetAboutMeData);
  inputSets.push(
    inputSetName.buildFormInputSet(),
    inputSetAboutMe.buildFormInputSet()
  );
  inputSetName.setInputValue(page.querySelector(".profile__name").textContent);
  inputSetAboutMe.setInputValue(
    page.querySelector(".profile__occupation").textContent
  );
  const newForm = new Form(
    "Editar Perfil",
    "Guardar",
    inputSets,
    handleProfileEditSubmit
  );
  modalHandler.setContent(newForm.buildForm());
  modalHandler.buildModal();
  modalHandler.open();
  inputSetName.inputFocus();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const targetForm = evt.target;
  page.querySelector(".profile__name").textContent = targetForm.name.value;
  page.querySelector(".profile__occupation").textContent =
    targetForm.aboutMe.value;
  modalHandler.close();
}

function handleAddCardButtonClick(evt) {
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
  modalHandler.setContent(newCardForm.buildForm());
  modalHandler.buildModal();
  modalHandler.open();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const targetForm = evt.target;
  const cardTitle = targetForm.title;
  const cardImageUrl = targetForm.imageUrl;
  const card = new Card(cardTitle.value, cardImageUrl.value);
  const destinationsList = page.querySelector(".destinations__list");
  destinationsList.prepend(card.buildCard());
  modalHandler.close();
}
