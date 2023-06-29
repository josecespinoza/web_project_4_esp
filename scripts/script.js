const page = document.querySelector(".page");
const editButton = page.querySelector(".button_action_edit");
editButton.addEventListener("click", handleEditButtonClick);
addEventListenerToDestinations();
addEventListenerToLikeButtons();

function closeModal() {
  const profileFormContainer = page.querySelector(".modal-container");
  profileFormContainer.remove();
}

function handleCloseButtonClick() {
  closeModal();
}

function handleFormSubmit() {
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
                      <input class="profile-form__input profile-form__name" placeholder="Nombre"></input>
                      <input class="profile-form__input profile-form__about" placeholder="Acerca de mí"></input>
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
    profileForm.addEventListener("submit", handleFormSubmit);
  }
}

function handleDestinationCardClick(evt) {
  page.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal-container modal-container_content_image">
      <div class="modal-container__window modal-container__window_content_image">
          <img class="destination-popup">
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
  const photoAlt = evt.target.getAttribute("alt");
  const cardPhoto = page.querySelector(".destination-popup");
  cardPhoto.src = photoSource;
  cardPhoto.alt = photoAlt;
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

function addEventListenerToLikeButtons() {
  const likeButtons = page.querySelectorAll(".button__icon_action_like");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", handleLikeButtonClick);
  });
}
