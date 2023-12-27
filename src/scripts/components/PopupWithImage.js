import { popupConfig } from "../helpers/config.js";
import { page } from "../helpers/constants.js";
import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  #imageUrl;
  #description;
  #image;
  #caption;
  #imageComponent;

  constructor(popupSelector, { imageUrl, description }) {
    super(popupSelector, popupConfig);
    this.#imageUrl = imageUrl;
    this.#description = description;
    this.#image = null;
    this.#caption = null;
    this.open = this.open.bind(this);
  }
  #modifyContentContainer() {
    super._modifyContentContainer(popupConfig.popupModifierImageClass);
  }

  #getImageTemplate() {
    return page.querySelector(popupConfig.popupImageTplSelector).cloneNode(true)
      .content;
  }

  #setImage(imageUrl, description) {
    this.#image = this.#getImageComponent().querySelector(
      popupConfig.popupPhotoSelector
    );
    this.#image.setAttribute("src", imageUrl);
    this.#image.setAttribute("alt", description);
  }

  #setCaption(description) {
    this.#caption = this.#getImageComponent().querySelector(
      popupConfig.popupDescSelector
    );
    this.#caption.textContent = description;
  }

  #setImageComponent() {
    if (!this.#imageComponent) {
      this.#imageComponent = this.#getImageTemplate();
      this.#setImage(this.#imageUrl, this.#description);
      this.#setCaption(this.#description);
      this.#modifyContentContainer();
      super._getContentContainer().append(this.#image);
      super._getContentContainer().append(this.#caption);
    }
  }

  #getImageComponent() {
    return this.#imageComponent;
  }

  open() {
    super.open();
    this.#setImageComponent();
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
