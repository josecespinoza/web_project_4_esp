import { page } from "../constants.js";
import { cardConfig } from "../config.js";

class Card {
  constructor(name, imageUrl, handleCardClick, config = cardConfig) {
    this._name = name;
    this._imageUrl = imageUrl;
    this._config = config;
    this._card = null;
    this._popUpCard = null;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
  }

  _setCardName(name) {
    this._card.querySelector(this._config.cardNameSelector).textContent = name;
  }

  _setCardImage(alt, imageUrl) {
    const image = this._card.querySelector(this._config.cardImageSelector);
    image.setAttribute("alt", alt);
    image.setAttribute("src", imageUrl);
  }

  _setPopUpDescription(description) {
    this._popUpCard.querySelector(this._config.popUpDescSelector).textContent =
      description;
  }

  _getTemplate() {
    return page
      .querySelector(this._config.cardTemplateSelector)
      .content.cloneNode(true);
  }

  _getImage() {
    return this._card.querySelector(this._config.cardImageSelector);
  }

  _getLikeButton() {
    return this._card.querySelector(this._config.likeButtonSelector);
  }

  _getDeleteButton() {
    return this._card.querySelector(this._config.deleteButtonSelector);
  }

  _getPopUpTemplate() {
    return page
      .querySelector(this._config.popUpTemplateSelector)
      .content.cloneNode(true);
  }

  _getPopUpImage() {
    return this._popUpCard.querySelector(this._config.popUpPhotoSelector);
  }

  _setCardListeners() {
    this._getImage().addEventListener("click", this._handleCardClick);

    this._getLikeButton().addEventListener(
      "click",
      this._handleLikeButtonClick
    );
    this._getDeleteButton().addEventListener(
      "click",
      this._handleDeleteButtonClick
    );
  }

  _removeCardListeners() {
    this._getImage().removeEventListener("click", this._handleCardClick);
    this._getLikeButton().removeEventListener(
      "click",
      this._handleLikeButtonClick
    );
    this._getDeleteButton().removeEventListener(
      "click",
      this._handleDeleteButtonClick
    );
  }

  _toggleLikeButton() {
    this._isLiked() ? this._like() : this._dislike();
  }

  _like() {
    this._getLikeButton().classList.remove(this._config.notLikedButtonClass);
    this._getLikeButton().classList.add(this._config.isLikedButtonClass);
  }

  _dislike() {
    this._getLikeButton().classList.remove(this._config.isLikedButtonClass);
    this._getLikeButton().classList.add(this._config.notLikedButtonClass);
  }

  _isLiked() {
    return this._getLikeButton().classList.contains(
      this._config.notLikedButtonClass
    );
  }

  _handleLikeButtonClick() {
    this._toggleLikeButton();
  }

  _handleDeleteButtonClick() {
    this._removeCardListeners(this._card);
    this._card.remove();
  }

  buildCard() {
    this._card = this._getTemplate().querySelector(this._config.cardSelector);
    this._setCardName(this._name);
    this._setCardImage(this._name, this._imageUrl);
    this._setCardListeners();
    return this._card;
  }
}

export default Card;