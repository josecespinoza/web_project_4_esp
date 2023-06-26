let page = document.querySelector(".page");
let editButton = page.querySelector(".button_action_edit");

function closeModal() {
  let profileFormContainer = page.querySelector(".modal-container");
  profileFormContainer.remove();
}

function handleCloseButtonClick() {
  closeModal();
}

function handleFormSubmit() {
  console.log("button was clicked");
  let newProfileName = page.querySelector(".profile-form__name");
  let newProfileOccupation = page.querySelector(".profile-form__about");
  let profileName = page.querySelector(".profile__name");
  let profileOccupation = page.querySelector(".profile__occupation");
  profileName.textContent = newProfileName.value;
  profileOccupation.textContent = newProfileOccupation.value;
  closeModal();
}

function handleEditButtonClick() {
  let profileName = page.querySelector(".profile__name");
  let profileOccupation = page.querySelector(".profile__occupation");
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
        <div class="profile-form__backdrop">
        </div>
    </div>`
  );
  let profileForm = page.querySelector(".profile-form");
  let closeButton = page.querySelector(".button_action_close");
  closeButton.addEventListener("click", handleCloseButtonClick);
  profileForm.addEventListener("submit", handleFormSubmit);
}

editButton.addEventListener("click", handleEditButtonClick);
