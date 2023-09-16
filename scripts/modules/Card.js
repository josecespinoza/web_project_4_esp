import { page } from "./constants.js";
import { openModal, createCustomModal } from "./modal.js";
import { cardConfig } from "./config.js";

class Card {
  constructor(name, imageUrl, config = cardConfig) {
    this._name = name;
    this._imageUrl = imageUrl;
    this._config = config;
    this._card = null;
  }

  buildCard() {
    this._card = this._getTemplate().querySelector(this._config.cardSelector);
    this._setCardName(this._name);
    this._setCardImage(this._name, this._imageUrl);
    this._setCardListeners();
    return this._card;
  }

  _setCardName(name) {
    this._card.querySelector(this._config.cardNameSelector).textContent = name;
  }

  _setCardImage(alt, imageUrl) {
    const image = this._card.querySelector(this._config.cardImageSelector);
    image.setAttribute("alt", alt);
    image.setAttribute("src", imageUrl);
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

  _setCardListeners() {
    this._getImage().addEventListener("click", () => {
      this._handleCardClick();
    });

    this._getLikeButton().addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    this._getDeleteButton().addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
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

  _handleCardClick() {
    const destinationPopUp = createDestinationPopUp(this._imageUrl, this._name);
    openModal(destinationPopUp);
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

  _toggleLikeButton() {
    this._isLiked() ? this._like() : this._dislike();
  }

  _handleLikeButtonClick() {
    this._toggleLikeButton();
  }

  _handleDeleteButtonClick() {
    this._removeCardListeners(this._card);
    this._card.remove();
  }
}

function createDestinationCard(destination, config = cardConfig) {
  const destinationCardClone = document
    .querySelector(config.cardTemplateSelector)
    .content.cloneNode(true);
  const destinationCard = destinationCardClone.querySelector(
    config.cardSelector
  );
  destinationCard.querySelector(config.cardNameSelector).textContent =
    destination.name;
  const destinationPhoto = destinationCard.querySelector(
    config.cardImageSelector
  );
  destinationPhoto.setAttribute("alt", destination.name);
  destinationPhoto.setAttribute("src", destination.link);
  setDestinationCardListeners(destinationCard);
  return destinationCard;
}

function setDestinationCardListeners(destinationCard, config = cardConfig) {
  const destinationPhoto = destinationCard.querySelector(
    config.cardImageSelector
  );
  destinationPhoto.addEventListener("click", handleDestinationCardClick);
  const destinationLikeButton = destinationCard.querySelector(
    config.likeButtonSelector
  );
  destinationLikeButton.addEventListener("click", handleLikeButtonClick);
  const destinationDeleteButton = destinationCard.querySelector(
    config.deleteButtonSelector
  );
  destinationDeleteButton.addEventListener("click", handleDeleteButtonClick);
}

function removeDestinationCardListeners(destinationCard, config = cardConfig) {
  const destinationPhoto = destinationCard.querySelector(
    config.cardImageSelector
  );
  destinationPhoto.removeEventListener("click", handleDestinationCardClick);
  const destinationLikeButton = destinationCard.querySelector(
    config.likeButtonSelector
  );
  destinationLikeButton.removeEventListener("click", handleLikeButtonClick);
  const destinationDeleteButton = destinationCard.querySelector(
    config.deleteButtonSelector
  );
  destinationDeleteButton.removeEventListener("click", handleDeleteButtonClick);
}

function handleDestinationCardClick(evt) {
  const description = evt.target.alt;
  const imageUrl = evt.target.src;
  const destinationPopUp = createDestinationPopUp(imageUrl, description);
  openModal(destinationPopUp);
}

function handleLikeButtonClick(evt, config = cardConfig) {
  const clickedButton = evt.target;
  if (clickedButton.classList.contains(config.notLikedButtonClass)) {
    clickedButton.classList.remove(config.notLikedButtonClass);
    clickedButton.classList.add(config.isLikedButtonClass);
  } else {
    clickedButton.classList.remove(config.isLikedButtonClass);
    clickedButton.classList.add(config.notLikedButtonClass);
  }
}

function handleDeleteButtonClick(evt, config = cardConfig) {
  const card = evt.target.closest(config.cardSelector);
  removeDestinationCardListeners(card);
  card.remove();
}

function createDestinationPopUp(imageUrl, description, config = cardConfig) {
  const destinationPopUpTemplate = page.querySelector(
    config.popUpTemplateSelector
  );
  const newDestinationPopup = destinationPopUpTemplate.cloneNode(true).content;
  const destinationPhoto = newDestinationPopup.querySelector(
    config.popUpPhotoSelector
  );
  destinationPhoto.setAttribute("src", imageUrl);
  destinationPhoto.setAttribute("alt", description);
  const destinationDescription = newDestinationPopup.querySelector(
    config.popUpDescSelector
  );
  destinationDescription.textContent = description;

  const destinationPopUpModal = createCustomModal(newDestinationPopup);
  return destinationPopUpModal;
}

export { Card };
