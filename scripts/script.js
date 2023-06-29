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
  console.log("button was clicked");
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
    const profileName = page.querySelector(".profile__name");
    const profileOccupation = page.querySelector(".profile__occupation");
    page.insertAdjacentHTML(
      "afterbegin",
      `<div class="modal-container">
          <div class="modal-container__window">
              <form class="profile-form profile-form_theme_dark modal-container__profile-form">
                  <h2 class="profile-form__title">Editar Perfil</h2>
                  <div class="profile-form__inputs">
                      <input class="profile-form__input profile-form__name" placeholder="Nombre" value="${profileName.textContent}"></input>
                      <input class="profile-form__input profile-form__about" placeholder="Acerca de mí"
                          value="${profileOccupation.textContent}"></input>
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

    page.querySelector(".profile-form__input.profile-form__name").focus();
    page.querySelector(".profile-form__input.profile-form__name").select();
    const profileForm = page.querySelector(".profile-form");
    const closeButton = page.querySelector(".button_action_close");
    closeButton.addEventListener("click", handleCloseButtonClick);
    profileForm.addEventListener("submit", handleFormSubmit);
    /* profileForm.addEventListener("keypress", function handleKeyPress(evt) {
      if (evt.key === "Enter") {
        handleFormSubmit(evt);
      }
      console.log("test");
    }); */
  }
}

function handleDestinationCardClick(evt) {
  const photoSource = evt.target.getAttribute("src");
  const photoAlt = evt.target.getAttribute("alt");
  page.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal-container modal-container_content_image">
      <div class="modal-container__window modal-container__window_content_image">
          <img class="destination-popup" src="${photoSource}" alt="${photoAlt}">
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
  const closeButton = page.querySelector(".button_action_close");
  closeButton.addEventListener("click", handleCloseButtonClick);
}

function addEventListenerToDestinations() {
  const images = page.querySelectorAll(".destination__photo");
  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", handleDestinationCardClick);
  }
}

function handleLikeButtonClick(evt) {
  console.log("clicked");
  const clickedButton = evt.target;
  if (clickedButton.classList.contains("button__icon_action_like")) {
    clickedButton.classList.remove("button__icon_action_like");
    clickedButton.classList.add("button__icon_action_liked");
  } else if (clickedButton.classList.contains("button__icon_action_liked")) {
    clickedButton.classList.remove("button__icon_action_liked");
    clickedButton.classList.add("button__icon_action_like");
  }
}

function addEventListenerToLikeButtons() {
  const likeButtons = page.querySelectorAll(".button__icon_action_like");
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", handleLikeButtonClick);
  }
}
