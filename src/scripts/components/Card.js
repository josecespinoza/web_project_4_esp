import { page } from "../helpers/constants.js";
import { cardConfig } from "../helpers/config.js";

class Card {
  #id;
  #name;
  #imageUrl;
  #likesCounter;
  #config;
  #cardElement;
  #popUpCard;
  #handleCardClick;
  #handleCardLike;
  #handleCardDelete;

  constructor(
    id,
    name,
    imageUrl,
    likesCounter,
    handleCardClick,
    config = cardConfig
  ) {
    this.#id = id;
    this.#name = name;
    this.#imageUrl = imageUrl;
    this.status = null;
    this.#likesCounter = likesCounter;
    this.#config = config;
    this.#cardElement = null;
    this.#popUpCard = null;
    this.#handleCardClick = handleCardClick;
    this.buildCard = this.buildCard.bind(this);
  }

  getCardElement() {
    return this.#cardElement;
  }

  getCardId() {
    return this.#id;
  }

  #setCardName(name) {
    this.#cardElement.querySelector(this.#config.cardNameSelector).textContent =
      name;
  }

  #setCardImage(alt, imageUrl) {
    const image = this.#cardElement.querySelector(
      this.#config.cardImageSelector
    );
    image.setAttribute("alt", alt);
    image.setAttribute("src", imageUrl);
  }

  setLikesCounter(counter) {
    this.#cardElement.querySelector(
      this.#config.likeCounterSelector
    ).textContent = counter;
  }

  #getTemplate() {
    return page
      .querySelector(this.#config.cardTemplateSelector)
      .content.cloneNode(true);
  }

  #getImage() {
    return this.#cardElement.querySelector(this.#config.cardImageSelector);
  }

  #getLikeButton() {
    return this.#cardElement.querySelector(this.#config.likeButtonSelector);
  }

  #getDeleteButton() {
    return this.#cardElement.querySelector(this.#config.deleteButtonSelector);
  }

  setLikeButtonHandler(handler) {
    this.#handleCardLike = handler;
    this.#getLikeButton().addEventListener("click", (evt) => {
      this.#handleCardLike(evt, this);
    });
  }

  setDeleteButtonHandler(handler) {
    this.#handleCardDelete = handler;
    this.#getDeleteButton().addEventListener("click", (evt) => {
      this.#handleCardDelete(evt, this);
    });
  }

  toggleDeleteButton() {
    if (this.#getDeleteButton().hidden) {
      this.#getDeleteButton().hidden = false;
    } else {
      this.#getDeleteButton().hidden = true;
    }
  }

  setStatus(status) {
    this.status = status;
  }

  #setCardListeners() {
    this.#getImage().addEventListener("click", this.#handleCardClick);
    this.#getDeleteButton().addEventListener("click", this.#handleCardDelete);
  }

  #removeCardListeners() {
    this.#getImage().removeEventListener("click", this.#handleCardClick);
  }

  toggleLikeButton() {
    this.#isLiked() ? this.#unlike() : this.#like();
  }

  removeDeleteButton() {
    this.#getDeleteButton().remove();
  }

  #like() {
    this.status = this.#config.likedStatus;
    const likeIcon = this.#getLikeButton().querySelector(
      this.#config.likeButtonIconSelector
    );
    likeIcon.classList.remove(this.#config.notLikedButtonClass);
    likeIcon.classList.add(this.#config.isLikedButtonClass);
  }

  #unlike() {
    this.status = this.#config.unlikedStatus;
    this.#getLikeButton().setAttribute("value", false);
    const likeIcon = this.#getLikeButton().querySelector(
      this.#config.likeButtonIconSelector
    );
    likeIcon.classList.remove(this.#config.isLikedButtonClass);
    likeIcon.classList.add(this.#config.notLikedButtonClass);
  }

  #isLiked() {
    return this.status === this.#config.likedStatus ? true : false;
  }

  buildCard() {
    this.#cardElement = this.#getTemplate().querySelector(
      this.#config.cardSelector
    );
    this.#setCardName(this.#name);
    this.#setCardImage(this.#name, this.#imageUrl);
    this.setLikesCounter(this.#likesCounter);
    this.#setCardListeners();
    return this.#cardElement;
  }
}

export default Card;
