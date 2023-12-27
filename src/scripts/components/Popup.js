import { page } from "../helpers/constants.js";
import { popupConfig } from "../helpers/config.js";

class Popup {
  #config;
  #popupSelector;
  #popup;
  #isClosing;

  constructor(popupSelector, config = popupConfig) {
    this.#config = config;
    this.#popupSelector = popupSelector;
    this.#popup = null;
    this.#isClosing = null;
  }

  #getTemplate() {
    return page
      .querySelector(this.#config.popupTemplateSelector)
      .cloneNode(true).content;
  }

  #getModalBackdrop() {
    return this.#popup.querySelector(this.#config.popupBackdropSelector);
  }

  #getCloseButton() {
    return this.#popup.querySelector(this.#config.popupCloseButtonSelector);
  }

  #togglePopup() {
    if (!this.#popup.classList.contains(this.#config.popupOpenedStateClass)) {
      this.#popup.classList.add(this.#config.popupOpenedStateClass);
      this.#popup.classList.remove(this.#config.popupClosedStateClass);
    } else {
      this.#popup.classList.add(this.#config.popupClosedStateClass);
      this.#popup.classList.remove(this.#config.popupOpenedStateClass);
    }
  }

  #playClosingAnimation() {
    this.#isClosing = true;
    setTimeout(() => {
      this.#popup.remove();
      this.#isClosing = false;
    }, this.#config.popupClosingTimeInMs);
  }

  #closeOnClick(element) {
    element.addEventListener("click", this.#handleClickClose.bind(this));
  }

  #closeOnEscape(element) {
    element.addEventListener("keydown", this.#handleEscClose.bind(this));
  }

  #handleClickClose(evt) {
    evt.type.toLowerCase() === "click" && this.close();
  }

  #handleEscClose(evt) {
    evt.key?.toLowerCase() === "escape" && this.close();
  }

  #isOpened() {
    return page.querySelector(this.#popupSelector);
  }

  getContentSelector() {
    return this.#config.popupContentSelector;
  }

  _getContentContainer() {
    return this.#popup.querySelector(this.#config.popupContentSelector);
  }

  _modifyContentContainer(contentClass) {
    this._getContentContainer().classList.add(contentClass);
  }

  open() {
    if (!this.#isOpened()) {
      this.#togglePopup();
      page.prepend(this.#popup);
    }
    this.#popup.focus();
  }

  close() {
    if (!this.#isClosing) {
      this.#togglePopup();
      this.#playClosingAnimation();
    }
  }

  setEventListeners() {
    this.#closeOnClick(this.#getModalBackdrop());
    this.#closeOnClick(this.#getCloseButton());
    this.#closeOnEscape(this.#popup);
  }

  buildPopup() {
    this.#popup = this.#getTemplate().querySelector(this.#popupSelector);
  }
}

export default Popup;
