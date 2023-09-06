import { page } from "./constants.js";

const modalConfig = {
  modalTemplateSelector: "#modal-template",
  modalSelector: ".modal-container",
  modalContentSelector: ".modal-container__content",
  modalBackdropSelector: ".modal-container__backdrop",
  modalCloseButtonSelector: ".button__icon_action_close",
  modalModifierFormClass: "modal-container__form",
  modalClosedStateClass: "modal-container_state_closed",
  modalOpenedStateClass: "modal-container_state_opened",
  formClass: "form",
};

function createModal(content, config = modalConfig) {
  const modalTemplate = page.querySelector(config.modalTemplateSelector);
  const modal = modalTemplate
    .cloneNode(true)
    .content.querySelector(config.modalSelector);
  if (content) {
    const modalContentSection = modal.querySelector(
      config.modalContentSelector
    );
    if (content.classList.contains(config.formClass)) {
      content.classList.add(config.modalModifierFormClass);
    }

    modalContentSection.prepend(content);
  }
  setCloseModalListeners(modal);
  return modal;
}

function createCustomModal(customContent, config = modalConfig) {
  const customModal = createModal();
  customModal.querySelector(config.modalContentSelector).remove();
  customModal.prepend(customContent);
  return customModal;
}

function openModal(modal, config = modalConfig) {
  if (!page.querySelector(config.modalSelector)) {
    page.prepend(modal);
    modal.classList.remove(config.modalClosedStateClass);
    modal.classList.add(config.modalOpenedStateClass);
  }
}

function closeModal(config = modalConfig) {
  const modalContainer = page.querySelector(config.modalSelector);
  modalContainer.classList.remove(config.modalOpenedStateClass);
  modalContainer.classList.add(config.modalClosedStateClass);
  setTimeout(() => {
    modalContainer.remove();
  }, 300);
}

function setCloseModalListeners(modal, config = modalConfig) {
  const modalBackDrop = modal.querySelector(config.modalBackdropSelector);
  const closeButton = modal.querySelector(config.modalCloseButtonSelector);
  modalBackDrop.addEventListener("click", handleCloseButtonClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
  return modal;
}

function handleCloseButtonClick() {
  closeModal();
}

export { createModal, createCustomModal, openModal, closeModal };
