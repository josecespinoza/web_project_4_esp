import { popupConfig } from "../modules/config.js";
import { page } from "../modules/constants.js";
import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, { imageUrl, description }) {
    super(popupSelector, popupConfig);
    this._imageUrl = imageUrl;
    this._description = description;
    this.open = this.open.bind(this);
  }
  _modifyContentContainer() {
    super._modifyContentContainer(popupConfig.popupModifierImageClass);
  }

  _setUpImageElement(imageElement) {
    imageElement.setAttribute("src", this._imageUrl);
    imageElement.setAttribute("alt", this._description);
    return imageElement;
  }

  _getImageTemplate() {
    return page.querySelector("#popupImage-template").cloneNode(true).content;
  }

  _setImage() {
    this._modifyContentContainer();
    const imageElement =
      this._getImageTemplate().querySelector(".popup__photo");
    this._setUpImageElement(imageElement);
    this._getContentContainer().append(imageElement);
  }

  _setDescription() {
    const descElement = this._getImageTemplate().querySelector(
      ".popup__description"
    );
    descElement.textContent = this._description;
    this._getContentContainer().append(descElement);
  }

  open() {
    super.open();
    this._setImage();
    this._setDescription();
  }
}

export default PopupWithImage;
