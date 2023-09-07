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

const createModal = (content, config = modalConfig) => {
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
};

const isForm = (content, config = modalConfig) => {
  return content.classList.contains(config.formClass);
};

const createCustomModal = (customContent, config = modalConfig) => {
  const customModal = createModal();
  customModal.querySelector(config.modalContentSelector).remove();
  customModal.prepend(customContent);
  return customModal;
};

const getCurrentModal = (modalChild, config = modalConfig) => {
  const modal = modalChild.closest(config.modalSelector);
  return modal;
};

const openModal = (modal, config = modalConfig) => {
  if (!page.querySelector(config.modalSelector)) {
    page.prepend(modal);
    modal.classList.remove(config.modalClosedStateClass);
    modal.classList.add(config.modalOpenedStateClass);
  }
  modal.focus();
};

const closeModal = (modal, config = modalConfig) => {
  modal.classList.remove(config.modalOpenedStateClass);
  modal.classList.add(config.modalClosedStateClass);
  removeModalListeners(modal);
  setTimeout(() => {
    modal.remove();
  }, 300);
};

const setModalListeners = (modal, config = modalConfig) => {
  const modalBackDrop = modal.querySelector(config.modalBackdropSelector);
  const closeButton = modal.querySelector(config.modalCloseButtonSelector);
  const closeActionElements = [modalBackDrop, closeButton];
  closeActionElements.forEach((element) => {
    element.addEventListener("click", handleCloseModalEvent);
  });
  modal.addEventListener("keydown", handleCloseModalEvent);
  return modal;
};

const removeModalListeners = (modal, config = modalConfig) => {
  const modalBackDrop = modal.querySelector(config.modalBackdropSelector);
  const closeButton = modal.querySelector(config.modalCloseButtonSelector);
  const closeActionElements = [modalBackDrop, closeButton];
  closeActionElements.forEach((closeActionElement) => {
    closeActionElement.removeEventListener("click", handleCloseModalEvent);
  });
  modal.removeEventListener("keydown", handleCloseModalEvent);
  return modal;
};

const handleCloseModalEvent = (evt, config = modalConfig) => {
  const modal = evt.target.closest(config.modalSelector);
  closeModal(modal);
};

export {
  createModal,
  createCustomModal,
  openModal,
  closeModal,
  getCurrentModal,
};
