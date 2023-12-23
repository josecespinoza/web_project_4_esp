import { page } from "../helpers/constants.js";
import { cardConfig } from "../helpers/config.js";

class Card {
  constructor(
    id,
    name,
    imageUrl,
    likesCounter,
    handleCardClick,
    handleCardDelete,
    config = cardConfig
  ) {
    this._id = id;
    this._name = name;
    this._imageUrl = imageUrl;
    this._status = null;
    this._likesCounter = likesCounter;
    this._config = config;
    this._cardElement = null;
    this._popUpCard = null;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._getLikeButton = this._getLikeButton.bind(this);
    this._handleLikeButtonClick = this._handleLikeButtonClick.bind(this);
    this.buildCard = this.buildCard.bind(this);
  }

  _setCardId(id) {
    this._cardElement.setAttribute("id", `id_${id}`);
  }

  _setCardName(name) {
    this._cardElement.querySelector(this._config.cardNameSelector).textContent =
      name;
  }

  _setCardImage(alt, imageUrl) {
    const image = this._cardElement.querySelector(
      this._config.cardImageSelector
    );
    image.setAttribute("alt", alt);
    image.setAttribute("src", imageUrl);
  }

  _setPopUpDescription(description) {
    this._popUpCard.querySelector(this._config.popUpDescSelector).textContent =
      description;
  }

  setLikesCounter(counter) {
    this._cardElement.querySelector(
      this._config.likeCounterSelector
    ).textContent = counter;
  }

  _getTemplate() {
    return page
      .querySelector(this._config.cardTemplateSelector)
      .content.cloneNode(true);
  }

  _getImage() {
    return this._cardElement.querySelector(this._config.cardImageSelector);
  }

  _getLikeButton() {
    return this._cardElement.querySelector(this._config.likeButtonSelector);
  }

  _getDeleteButton() {
    return this._cardElement.querySelector(this._config.deleteButtonSelector);
  }

  _getPopUpTemplate() {
    return page
      .querySelector(this._config.popUpTemplateSelector)
      .content.cloneNode(true);
  }

  _getPopUpImage() {
    return this._popUpCard.querySelector(this._config.popUpPhotoSelector);
  }

  setLikeHandler(handler) {
    this._handleCardLike = handler;
    this._getLikeButton().addEventListener("click", (evt) => {
      this._handleCardLike(evt, this);
    });
  }

  setStatus(status) {
    this._status = status;
  }

  _setCardListeners() {
    this._getImage().addEventListener("click", this._handleCardClick);
    this._getDeleteButton().addEventListener("click", this._handleCardDelete);
  }

  _removeCardListeners() {
    this._getImage().removeEventListener("click", this._handleCardClick);
    this._getLikeButton().removeEventListener(
      "click",
      this._handleLikeButtonClick
    );
    this._getDeleteButton().removeEventListener(
      "click",
      this._handleCardDelete
    );
  }

  toggleLikeButton() {
    this._isLiked() ? this._unlike() : this._like();
  }

  _like() {
    this._status = this._config.likedStatus;
    const likeIcon = this._getLikeButton().querySelector(
      this._config.likeButtonIconSelector
    );
    likeIcon.classList.remove(this._config.notLikedButtonClass);
    likeIcon.classList.add(this._config.isLikedButtonClass);
  }

  _unlike() {
    this._status = this._config.unlikedStatus;
    this._getLikeButton().setAttribute("value", false);
    const likeIcon = this._getLikeButton().querySelector(
      this._config.likeButtonIconSelector
    );
    likeIcon.classList.remove(this._config.isLikedButtonClass);
    likeIcon.classList.add(this._config.notLikedButtonClass);
  }

  _isLiked() {
    return this._status === this._config.likedStatus ? true : false;
  }

  _handleLikeButtonClick(evt) {
    this._handleCardLike(evt);
    this.toggleLikeButton();
  }

  buildCard() {
    this._cardElement = this._getTemplate().querySelector(
      this._config.cardSelector
    );
    this._setCardId(this._id);
    this._setCardName(this._name);
    this._setCardImage(this._name, this._imageUrl);
    this.setLikesCounter(this._likesCounter);
    //this._likesCounter > 0 ? this._like() : this._unlike();
    this._setCardListeners();
    return this._cardElement;
  }
}

export default Card;
