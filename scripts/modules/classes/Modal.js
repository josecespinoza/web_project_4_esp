import { page } from "../constants.js";
import { modalConfig } from "../config.js";

class Modal {
  constructor(content = null, config = modalConfig) {
    this._config = config;
    this._content = content;
    this._modal = null;
  }

  _getTemplate() {
    return page
      .querySelector(this._config.modalTemplateSelector)
      .cloneNode(true).content;
  }

  _getModalBackdrop() {
    return this._modal.querySelector(this._config.modalBackdropSelector);
  }

  _getCloseButton() {
    return this._modal.querySelector(this._config.modalCloseButtonSelector);
  }

  _placeContent(content) {
    this._modal
      .querySelector(this._config.modalContentSelector)
      .prepend(content);
  }

  _contentIsForm(content) {
    return content.classList.contains(this._config.formClass);
  }

  _closeOnClick(element) {
    element.addEventListener("click", (evt) => {
      this._handleCloseOnClick(evt);
    });
  }

  _closeOnEscape(element) {
    element.addEventListener("keydown", (evt) => {
      this._handleCloseOnEscape(evt);
    });
  }

  _handleCloseOnClick(evt) {
    evt.type.toLowerCase() === "click" && this.close();
  }

  _handleCloseOnEscape(evt) {
    evt.key.toLowerCase() === "escape" && this.close();
  }

  _handleCloseModalEvent(evt) {
    const modal = evt.target.closest(this._config.modalSelector);
    if (this._isClosingEvent) {
      closeModal(modal);
    }
  }

  _removeModalListeners() {
    //TODO
  }

  _setModalListeners() {
    this._closeOnClick(this._getModalBackdrop());
    this._closeOnClick(this._getCloseButton());
    this._closeOnEscape(this._modal);
  }

  _isOpened() {
    return page.querySelector(this._config.modalSelector);
  }

  _toggleModal() {
    if (!this._modal.classList.contains(this._config.modalOpenedStateClass)) {
      this._modal.classList.add(this._config.modalOpenedStateClass);
      this._modal.classList.remove(this._config.modalClosedStateClass);
    } else {
      this._modal.classList.add(this._config.modalClosedStateClass);
      this._modal.classList.remove(this._config.modalOpenedStateClass);
    }
  }

  close() {
    this._toggleModal();
    //removeModalListeners(this._modal);
    setTimeout(() => {
      this._modal.remove();
    }, this._config.modalClosingTimeInMs);
  }

  open() {
    if (!this._isOpened()) {
      this._toggleModal();
      page.prepend(this._modal);
    }
    this._modal.focus();
  }

  setContent(content) {
    this._content = content;
  }

  buildModal() {
    if (this._contentIsForm(this._content)) {
      this._content.classList.add(this._config.modalModifierFormClass);
    }
    this._modal = this._getTemplate().querySelector(this._config.modalSelector);
    this._placeContent(this._content);
    this._setModalListeners();
    return this._modal;
  }
}

/*const removeModalListeners = (modal, config = modalConfig) => {
  const modalBackDrop = modal.querySelector(config.modalBackdropSelector);
  const closeButton = modal.querySelector(config.modalCloseButtonSelector);
  const closeActionElements = [modalBackDrop, closeButton];
  closeActionElements.forEach((closeActionElement) => {
    closeActionElement.removeEventListener("click", handleCloseModalEvent);
  });
  modal.removeEventListener("keydown", handleCloseModalEvent);
  return modal;
};*/

export default Modal;
