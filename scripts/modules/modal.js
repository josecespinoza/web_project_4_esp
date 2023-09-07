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
    if (isForm(content)) {
      content.classList.add(config.modalModifierFormClass);
    }

    modalContentSection.prepend(content);
  }
  setModalListeners(modal);
  return modal;
}

function isForm(content, config = modalConfig) {
  return content.classList.contains(config.formClass);
}

function createCustomModal(customContent, config = modalConfig) {
  const customModal = createModal();
  customModal.querySelector(config.modalContentSelector).remove();
  customModal.prepend(customContent);
  return customModal;
}

function getCurrentModal(modalChild, config = modalConfig) {
  const modal = modalChild.closest(config.modalSelector);
  return modal;
}

function openModal(modal, config = modalConfig) {
  if (!page.querySelector(config.modalSelector)) {
    page.prepend(modal);
    modal.classList.remove(config.modalClosedStateClass);
    modal.classList.add(config.modalOpenedStateClass);
  }
}

function closeModal(modal, config = modalConfig) {
  modal.classList.remove(config.modalOpenedStateClass);
  modal.classList.add(config.modalClosedStateClass);
  removeModalListeners(modal);
  setTimeout(() => {
    modal.remove();
  }, 300);
}

function setModalListeners(modal, config = modalConfig) {
  const modalBackDrop = modal.querySelector(config.modalBackdropSelector);
  const closeButton = modal.querySelector(config.modalCloseButtonSelector);
  const closeActionElements = [modalBackDrop, closeButton];
  closeActionElements.forEach((element) => {
    element.addEventListener("click", handleCloseButtonClick);
  });
  return modal;
}

function removeModalListeners(modal, config = modalConfig) {
  const modalBackDrop = modal.querySelector(config.modalBackdropSelector);
  const closeButton = modal.querySelector(config.modalCloseButtonSelector);
  const closeActionElements = [modalBackDrop, closeButton];
  closeActionElements.forEach((closeActionElement) => {
    closeActionElement.removeEventListener("click", handleCloseButtonClick);
  });
  return modal;
}

function handleCloseButtonClick(evt, config = modalConfig) {
  const modal = evt.target.closest(config.modalSelector);
  closeModal(modal);
}

export {
  createModal,
  createCustomModal,
  openModal,
  closeModal,
  getCurrentModal,
};
