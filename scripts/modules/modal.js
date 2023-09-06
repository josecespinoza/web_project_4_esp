import { page } from "./constants.js";

function createModal(content) {
  const modalTemplate = page.querySelector("#modal-template");
  const modal = modalTemplate
    .cloneNode(true)
    .content.querySelector(".modal-container");
  if (content) {
    const modalContentSection = modal.querySelector(
      ".modal-container__content"
    );
    if (content.classList.contains("form")) {
      content.classList.add("modal-container__form");
    }

    modalContentSection.prepend(content);
  }
  setCloseModalListeners(modal);
  return modal;
}

function createCustomModal(customContent) {
  const customModal = createModal();
  customModal.querySelector(".modal-container__content").remove();
  customModal.prepend(customContent);
  return customModal;
}

function openModal(modal) {
  if (!page.querySelector(".modal-container")) {
    page.prepend(modal);
    modal.classList.remove("modal-container_state_closed");
    modal.classList.add("modal-container_state_opened");
  }
}

function closeModal() {
  const profileFormContainer = page.querySelector(".modal-container");
  profileFormContainer.classList.remove("modal-container_state_opened");
  profileFormContainer.classList.add("modal-container_state_closed");
  setTimeout(() => {
    profileFormContainer.remove();
  }, 300);
}

function setCloseModalListeners(modal) {
  const modalBackDrop = modal.querySelector(".modal-container__backdrop");
  const closeButton = modal.querySelector(".button__icon_action_close");
  modalBackDrop.addEventListener("click", handleCloseButtonClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
  return modal;
}

function handleCloseButtonClick() {
  closeModal();
}

export { createModal, createCustomModal, openModal, closeModal };
