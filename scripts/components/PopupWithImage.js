import { popupConfig } from "../modules/config.js";
import { page } from "../modules/constants.js";
import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, { imageUrl, description }) {
    super(popupSelector, popupConfig);
    this._imageUrl = imageUrl;
    this._description = description;
    this._image = null;
    this._caption = null;
    this.open = this.open.bind(this);
  }
  _modifyContentContainer() {
    super._modifyContentContainer(popupConfig.popupModifierImageClass);
  }

  _getImageTemplate() {
    return page.querySelector("#popupImage-template").cloneNode(true).content;
  }

  _setImage(imageUrl, description) {
    this._image = this._getImageComponent().querySelector(".popup__photo");
    this._image.setAttribute("src", imageUrl);
    this._image.setAttribute("alt", description);
  }

  _setCaption(description) {
    this._caption = this._getImageComponent().querySelector(
      ".popup__description"
    );
    this._caption.textContent = description;
  }

  _setImageComponent() {
    if (!this._imageComponent) {
      this._imageComponent = this._getImageTemplate();
      this._setImage(this._imageUrl, this._description);
      this._setCaption(this._description);
      this._modifyContentContainer();
      this._getContentContainer().append(this._image);
      this._getContentContainer().append(this._caption);
    }
  }

  _getImageComponent() {
    return this._imageComponent;
  }

  open() {
    super.open();
    this._setImageComponent();
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
