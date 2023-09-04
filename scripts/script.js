const page = document.querySelector(".page");
const editButton = page.querySelector(".button_action_edit");
const addCardButton = page.querySelector(".button_action_add");
editButton.addEventListener("click", handleEditButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);

const initialCards = [
  {
    name: "Barcelona",
    link: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Paris",
    link: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Praga",
    link: "https://images.unsplash.com/photo-1564511287568-54483b52a35e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Gent",
    link: "https://images.unsplash.com/photo-1576014348818-da2d94117be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Roma",
    link: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
  },
  {
    name: "Milan",
    link: "https://images.unsplash.com/photo-1567760855784-589f09ed5dc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
  },
  {
    name: "Napoles",
    link: "https://images.unsplash.com/photo-1590663964384-e3bfac60bed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
  },
  {
    name: "Capri",
    link: "https://images.unsplash.com/photo-1549026841-dc1939a05b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=826&q=80",
  },
  {
    name: "Londres",
    link: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
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
  const inputName = createModalInput("text", "name", "Nombre", true, 40, 2);
  const inputAboutMe = createModalInput(
    "text",
    "aboutMe",
    "Acerca de mí",
    true,
    200,
    2
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
  const inputTitle = createModalInput("text", "title", "Título", true, 30, 2);
  const inputImageUrl = createModalInput(
    "url",
    "imageUrl",
    "Enlace a la imagen",
    true,
    500
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
  modal.querySelector(".form__title").textContent = modalTitle;
  const closeButton = modal.querySelector(".button__icon_action_close");
  closeButton.addEventListener("click", handleCloseButtonClick);
  return modal;
}

function createModalInput(
  type,
  name,
  placeholder,
  isRequired,
  maxlength,
  minlength = 0
) {
  const modalInputTemplate = page.querySelector("#modal__input-template");
  const modalInput = modalInputTemplate
    .cloneNode("true")
    .content.querySelector(".form__input");
  modalInput.setAttribute("type", type);
  modalInput.setAttribute("name", name);
  modalInput.setAttribute("placeholder", placeholder);
  modalInput.setAttribute("maxlength", maxlength);
  modalInput.setAttribute("minlength", minlength);
  modalInput.setAttribute("required", isRequired);
  return modalInput;
}

function buildModal(modal, ...inputs) {
  const modalInputsArea = modal.querySelector(".form__inputs");
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
