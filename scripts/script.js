const page = document.querySelector(".page");
const editButton = page.querySelector(".button_action_edit");
const addCardButton = page.querySelector(".button_action_add");
editButton.addEventListener("click", handleEditButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

loadDestinationCards(...initialCards);

function loadDestinationCards(...destinationCards) {
  const destinationsContainer = document.querySelector(".destinations__list");
  initialCards.forEach((destination) => {
    const destinationCard = createDestinationCard(destination);
    destinationsContainer.append(destinationCard);
  });
}

function handleEditButtonClick() {
  const modal = createModal("Editar Perfil");
  const inputName = createModalInput("text", "name", "Nombre", true);
  const inputAboutMe = createModalInput(
    "text",
    "aboutMe",
    "Acerca de mí",
    true
  );
  const profileModal = buildModal(modal, inputName, inputAboutMe);
  page.append(profileModal);
  inputName.value = page.querySelector(".profile__name").textContent;
  inputAboutMe.value = page.querySelector(".profile__occupation").textContent;
  inputName.focus();
  inputName.select();
  profileModal.addEventListener("submit", handleProfileEditSubmit);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  page.querySelector(".profile__name").textContent = form.name.value;
  page.querySelector(".profile__occupation").textContent = form.aboutMe.value;
  closeModal();
}

function handleAddCardButtonClick(evt) {
  const modal = createModal("Nuevo Lugar");
  const inputTitle = createModalInput("text", "title", "Título", true);
  const inputImageUrl = createModalInput(
    "url",
    "imageUrl",
    "Enlace a la imagen",
    true
  );
  const newCardModal = buildModal(modal, inputTitle, inputImageUrl);
  newCardModal.addEventListener("submit", handleAddCardFormSubmit);
  openModal(newCardModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  closeModal();
  const form = evt.target;
  const cardTitle = form.title;
  const cardImageUrl = form.imageUrl;
  const newDestination = {
    name: cardTitle.value,
    link: cardImageUrl.value,
  };
  const destinationsList = page.querySelector(".destinations__list");
  destinationsList.prepend(createDestinationCard(newDestination));
}

function createModal(modalTitle) {
  const modalTemplate = page.querySelector("#modal-template");
  const modal = modalTemplate
    .cloneNode(true)
    .content.querySelector(".modal-container");
  modal.querySelector(".profile-form__title").textContent = modalTitle;
  const closeButton = modal.querySelector(".button__icon_action_close");
  closeButton.addEventListener("click", handleCloseButtonClick);
  return modal;
}

function createModalInput(type, name, placeholder, isRequired) {
  const modalInputTemplate = page.querySelector("#modal__input-template");
  const modalInput = modalInputTemplate
    .cloneNode("true")
    .content.querySelector(".profile-form__input");
  modalInput.setAttribute("type", type);
  modalInput.setAttribute("name", name);
  modalInput.setAttribute("placeholder", placeholder);
  modalInput.setAttribute("required", isRequired);
  return modalInput;
}

function buildModal(modal, ...inputs) {
  const modalInputsArea = modal.querySelector(".profile-form__inputs");
  inputs.forEach((input) => {
    modalInputsArea.append(input);
  });
  return modal;
}

function openModal(modal) {
  page.prepend(modal);
  modal.classList.remove("modal-container_state_closed");
  modal.classList.add("modal-container_state_opened");
}

function closeModal() {
  const profileFormContainer = page.querySelector(".modal-container");
  profileFormContainer.classList.remove("modal-container_state_opened");
  profileFormContainer.classList.add("modal-container_state_closed");
  setTimeout(() => {
    profileFormContainer.remove();
  }, 300);
}

function createDestinationCard(destination) {
  const destinationCardClone = document
    .querySelector("#destinations__item-template")
    .content.cloneNode(true);
  const destinationCard = destinationCardClone.querySelector(
    ".destinations__item"
  );
  destinationCard.querySelector(".destination__name").textContent =
    destination.name;
  const destinationPhoto = destinationCard.querySelector(".destination__photo");
  destinationPhoto.setAttribute("alt", destination.name);
  destinationPhoto.setAttribute("src", destination.link);
  destinationPhoto.addEventListener("click", handleDestinationCardClick);
  const destinationLikeButton = destinationCard.querySelector(
    ".button__icon_action_like"
  );
  destinationLikeButton.addEventListener("click", handleLikeButtonClick);
  const destinationDeleteButton = destinationCard.querySelector(
    ".button__icon_action_delete"
  );
  destinationDeleteButton.addEventListener("click", handleDeleteButtonClick);

  return destinationCard;
}

function handleDestinationCardClick(evt) {
  const description = evt.target.alt;
  const imageUrl = evt.target.src;
  const destinationPopUp = createDestinationPopUp(imageUrl, description);
  destinationPopUp.classList.toggle("modal-container_state_closed");
  openModal(destinationPopUp);
}

function handleLikeButtonClick(evt) {
  const clickedButton = evt.target;
  if (clickedButton.classList.contains("button__icon_action_like")) {
    clickedButton.classList.remove("button__icon_action_like");
    clickedButton.classList.add("button__icon_action_liked");
  } else {
    clickedButton.classList.remove("button__icon_action_liked");
    clickedButton.classList.add("button__icon_action_like");
  }
}

function handleDeleteButtonClick(evt) {
  evt.target.closest(".destinations__item").remove();
}

function createDestinationPopUp(imageUrl, description) {
  const destinationPopUpTemplate = page
    .querySelector("#destination-popup-template")
    .cloneNode(true).content;
  const destinationPopUp =
    destinationPopUpTemplate.querySelector(".modal-container");
  const destinationPhoto = destinationPopUp.querySelector(
    ".destination-popup__photo"
  );
  destinationPhoto.setAttribute("src", imageUrl);
  const destinationDescription = destinationPopUp.querySelector(
    ".destination-popup__description"
  );
  destinationDescription.textContent = description;
  const closeButton = destinationPopUp.querySelector(
    ".button__icon_action_close"
  );
  closeButton.addEventListener("click", handleCloseButtonClick);
  return destinationPopUp;
}

function handleCloseButtonClick() {
  closeModal();
}
