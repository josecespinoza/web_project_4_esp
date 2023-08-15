const page = document.querySelector(".page");
const editButton = page.querySelector(".button_action_edit");
const addCardButton = page.querySelector(".button_action_add");
editButton.addEventListener("click", handleEditButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);
addEventListenerToDestinations();

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
  const destinationLikeButton = destinationCard.querySelector(
    ".button__icon_action_like"
  );
  destinationLikeButton.addEventListener("click", handleLikeButtonClick);
  return destinationCard;
}

function closeModal() {
  const profileFormContainer = page.querySelector(".modal-container");
  profileFormContainer.remove();
}

function handleCloseButtonClick() {
  closeModal();
}

function handleProfileEditSubmit() {
  const newProfileName = page.querySelector(".profile-form__name");
  const newProfileOccupation = page.querySelector(".profile-form__about");
  const profileName = page.querySelector(".profile__name");
  const profileOccupation = page.querySelector(".profile__occupation");
  profileName.textContent = newProfileName.value;
  profileOccupation.textContent = newProfileOccupation.value;
  closeModal();
}

function handleEditButtonClick() {
  if (!page.querySelector(".modal-container")) {
    page.insertAdjacentHTML(
      "afterbegin",
      `<div class="modal-container">
          <div class="modal-container__window">
              <form class="profile-form profile-form_theme_dark modal-container__profile-form">
                  <h2 class="profile-form__title">Editar Perfil</h2>
                  <div class="profile-form__inputs">
                      <input class="profile-form__input profile-form__name" maxlength="250" placeholder="Nombre"></input>
                      <input class="profile-form__input profile-form__about" maxlength="50" placeholder="Acerca de mí"></input>
                  </div>
                  <button class="button button_theme_light button_action_save button_location_profile-form">
                      Guardar
                  </button>
              </form>
          </div>
          <div class="modal-container__close-button">
              <button class="button button_theme_dark button_action_close">
                  <span class="button__icon button__icon_action_close"></span>
              </button>
          </div>
          <div class="modal-container__backdrop">
          </div>
      </div>`
    );
    const profileName = page.querySelector(".profile__name");
    const profileOccupation = page.querySelector(".profile__occupation");
    const nameInput = page.querySelector(
      ".profile-form__input.profile-form__name"
    );
    const occupationInput = page.querySelector(
      ".profile-form__input.profile-form__about"
    );
    nameInput.value = profileName.textContent;
    occupationInput.value = profileOccupation.textContent;
    nameInput.focus();
    nameInput.select();
    const profileForm = page.querySelector(".profile-form");
    const closeButton = page.querySelector(".button_action_close");
    closeButton.addEventListener("click", handleCloseButtonClick);
    profileForm.addEventListener("submit", handleProfileEditSubmit);
  }
}

function handleDestinationCardClick(evt) {
  page.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal-container">
      <div class="destination-popup">
          <img class="destination-popup__photo">
          <p class="destination-popup__description"></p>
      </div>
      <div class="modal-container__close-button">
          <button class="button button_theme_dark button_action_close">
              <span class="button__icon button__icon_action_close"></span>
          </button>
      </div>
      <div class="modal-container__backdrop">
      </div>
    </div>`
  );
  const photoSource = evt.target.getAttribute("src");
  const photoFileName = photoSource.substring(photoSource.lastIndexOf("/") + 1);
  const photoOriginalSizePath = "./images/destinations/originals/";
  const photoAlt = evt.target.getAttribute("alt");
  const popupPhoto = page.querySelector(".destination-popup__photo");
  popupPhoto.src = photoOriginalSizePath + photoFileName;
  popupPhoto.alt = photoAlt;
  const popupDescription = page.querySelector(
    ".destination-popup__description"
  );
  popupDescription.textContent = photoAlt;
  const closeButton = page.querySelector(".button_action_close");
  closeButton.addEventListener("click", handleCloseButtonClick);
}

function addEventListenerToDestinations() {
  const images = page.querySelectorAll(".destination__photo");
  images.forEach((image) => {
    image.addEventListener("click", handleDestinationCardClick);
  });
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

function handleAddCardButtonClick(evt) {
  const newCardModal = createModal("Nuevo Lugar");
  const inputTitle = createModalInput("title", "Título", true);
  const inputImageUrl = createModalInput(
    "imageUrl",
    "Enlace a la imagen",
    true
  );
  const newCardModalInputsSection = newCardModal.querySelector(
    ".profile-form__inputs"
  );
  newCardModalInputsSection.append(inputTitle, inputImageUrl);
  page.prepend(newCardModal);
  const modalForm = newCardModal.querySelector(
    ".modal-container__profile-form"
  );
  modalForm.addEventListener("submit", handleAddCardFormSubmit);
}

function createModalInput(name, placeholder, isRequired) {
  const modalInputTemplate = page.querySelector("#modal__input-template");
  const modalInput = modalInputTemplate
    .cloneNode("true")
    .content.querySelector(".profile-form__input");
  modalInput.setAttribute("name", name);
  modalInput.setAttribute("placeholder", placeholder);
  modalInput.setAttribute("required", isRequired);
  return modalInput;
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
