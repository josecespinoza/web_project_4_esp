import { popupConfig } from "../config.js";
import { page } from "../constants.js";
import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, { imageUrl, description }) {
    super(popupSelector, popupConfig);
    this._imageUrl = imageUrl;
    this._description = description;
  }

  _modifyContentContainer() {
    return this._getContentContainer().classList.add(
      "popup__content_type_image"
    );
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
    const DescElement = this._getImageTemplate().querySelector(
      ".popup__description"
    );
    DescElement.textContent = this._description;
    this._getContentContainer().append(DescElement);
  }

  open() {
    super.open();
    this._setImage();
    this._setDescription();
  }
}

export default PopupWithImage;
