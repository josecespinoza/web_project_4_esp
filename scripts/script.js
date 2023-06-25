let page = document.querySelector(".page");
let editButton = page.querySelector(".button_action_edit");

function handleCloseButtonClick() {
  console.log("button was clicked");
  let profileFormContainer = page.querySelector(".modal-container");
  profileFormContainer.remove();
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
                    <input class="profile-form__input" placeholder="Nombre" value="${profileName.textContent}"></input>
                    <input class="profile-form__input" placeholder="Acerca de mí"
                        value="${profileOccupation.textContent}"></input>
                </div>
                <div class="button button_theme_light button_action_save button_location_profile-form">
                    Guardar
                </div>
            </form>
        </div>
        <div class="modal-container__close-button">
            <div class="button button_theme_dark button_action_close">
                <div class="button__icon button__icon_action_close"></div>
            </div>
        </div>
        <div class="profile-form__backdrop">
        </div>
    </div>`
  );
  let closeButton = page.querySelector(".button_action_close");
  closeButton.addEventListener("click", handleCloseButtonClick);
}

editButton.addEventListener("click", handleEditButtonClick);
