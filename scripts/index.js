import { page, initialCards } from "./modules/constants.js";
import * as form from "./modules/form.js";
import * as modal from "./modules/modal.js";
import Card from "./modules/classes/Card.js";

const editButton = page.querySelector(".button_action_edit");
const addCardButton = page.querySelector(".button_action_add");
editButton.addEventListener("click", handleEditButtonClick);
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

function handleEditButtonClick() {
  const newForm = form.createForm("Editar Perfil", "Guardar");
  const inputSetName = form.createFormInputSet(
    "text",
    "name",
    "Nombre",
    true,
    40,
    2
  );
  const inputSetAboutMe = form.createFormInputSet(
    "text",
    "aboutMe",
    "Acerca de mí",
    true,
    200,
    2
  );
  const inputName = inputSetName.firstElementChild;
  inputName.value = page.querySelector(".profile__name").textContent;
  const inputAboutMe = inputSetAboutMe.firstElementChild;
  inputAboutMe.value = page.querySelector(".profile__occupation").textContent;
  const newProfileForm = form.buildForm(newForm, [
    inputSetName,
    inputSetAboutMe,
  ]);
  const newModal = modal.createModal(newProfileForm);
  form.setSubmitEventListener(newProfileForm, handleProfileEditSubmit);
  modal.openModal(newModal);
  inputName.focus();
  inputName.select();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const targetForm = evt.target;
  page.querySelector(".profile__name").textContent = targetForm.name.value;
  page.querySelector(".profile__occupation").textContent =
    targetForm.aboutMe.value;
  form.removeSubmitEventListener(targetForm, handleProfileEditSubmit);
  modal.closeModal(modal.getCurrentModal(targetForm));
}

function handleAddCardButtonClick(evt) {
  const newForm = form.createForm("Nuevo Lugar", "Guardar");
  const inputSetTitle = form.createFormInputSet(
    "text",
    "title",
    "Título",
    true,
    30,
    2
  );
  const inputSetImageUrl = form.createFormInputSet(
    "url",
    "imageUrl",
    "Enlace a la imagen",
    true,
    500
  );
  const newCardForm = form.buildForm(newForm, [
    inputSetTitle,
    inputSetImageUrl,
  ]);
  const newCardModal = modal.createModal(newCardForm);
  form.setSubmitEventListener(newCardForm, handleAddCardFormSubmit);
  modal.openModal(newCardModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const targetForm = evt.target;
  const cardTitle = targetForm.title;
  const cardImageUrl = targetForm.imageUrl;

  const card = new Card(cardTitle.value, cardImageUrl.value);
  const destinationsList = page.querySelector(".destinations__list");
  destinationsList.prepend(card.buildCard());
  form.removeSubmitEventListener(targetForm, handleAddCardFormSubmit);
  modal.closeModal(modal.getCurrentModal(targetForm));
}
