import { page } from "../modules/constants.js";
import { popupConfig } from "../modules/config.js";

class Popup {
  constructor(popupSelector, config = popupConfig) {
    this._config = config;
    this._popupSelector = popupSelector;
    this._popup = null;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  _getTemplate() {
    return page
      .querySelector(this._config.popupTemplateSelector)
      .cloneNode(true).content;
  }

  _getModalBackdrop() {
    return this._popup.querySelector(this._config.popupBackdropSelector);
  }

  _getCloseButton() {
    return this._popup.querySelector(this._config.popupCloseButtonSelector);
  }

  _togglePopup() {
    if (!this._popup.classList.contains(this._config.popupOpenedStateClass)) {
      this._popup.classList.add(this._config.popupOpenedStateClass);
      this._popup.classList.remove(this._config.popupClosedStateClass);
    } else {
      this._popup.classList.add(this._config.popupClosedStateClass);
      this._popup.classList.remove(this._config.popupOpenedStateClass);
    }
  }

  _playClosingAnimation() {
    setTimeout(() => {
      this._popup.remove();
    }, this._config.popupClosingTimeInMs);
  }

  _closeOnClick(element) {
    element.addEventListener("click", this._handleClickClose);
  }

  _closeOnEscape(element) {
    element.addEventListener("keydown", this._handleEscClose);
  }

  _handleClickClose(evt) {
    evt.type.toLowerCase() === "click" && this.close();
  }

  _handleEscClose(evt) {
    evt.key.toLowerCase() === "escape" && this.close();
  }

  _isOpened() {
    return page.querySelector(this.popupSelector);
  }

  getContentSelector() {
    return this._config.popupContentSelector;
  }

  _getContentContainer() {
    return this._popup.querySelector(this._config.popupContentSelector);
  }

  _modifyContentContainer(contentClass) {
    this._getContentContainer().classList.add(contentClass);
  }

  open() {
    if (!this._isOpened()) {
      this._togglePopup();
      page.prepend(this._popup);
    }
    this._popup.focus();
  }

  close() {
    this._togglePopup();
    this._playClosingAnimation();
    //this._removeModalListeners();
  }

  setEventListeners() {
    this._closeOnClick(this._getModalBackdrop());
    this._closeOnClick(this._getCloseButton());
    this._closeOnEscape(this._popup);
  }

  buildPopup() {
    this._popup = this._getTemplate().querySelector(this._popupSelector);
  }
}

export default Popup;
