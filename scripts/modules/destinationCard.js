import { page } from "./constants.js";
import * as modal from "./modal.js";

const cardConfig = {
  cardTemplateSelector: "#destinations__item-template",
  cardSelector: ".destinations__item",
  cardNameSelector: ".destination__name",
  cardPhotoSelector: ".destination__photo",
  likeButtonSelector: ".button__icon_action_like",
  deleteButtonSelector: ".button__icon_action_delete",
  popUpTemplateSelector: "#destination-popup-template",
  popUpPhotoSelector: ".destination-popup__photo",
  popUpDescSelector: ".destination-popup__description",
  notLikedButtonClass: "button__icon_action_like",
  isLikedButtonClass: "button__icon_action_liked",
};

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
    config.cardPhotoSelector
  );
  destinationPhoto.setAttribute("alt", destination.name);
  destinationPhoto.setAttribute("src", destination.link);
  setDestinationCardListeners(destinationCard);
  return destinationCard;
}

function setDestinationCardListeners(destinationCard, config = cardConfig) {
  const destinationPhoto = destinationCard.querySelector(
    config.cardPhotoSelector
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
    config.cardPhotoSelector
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
  modal.openModal(destinationPopUp);
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

  const destinationPopUpModal = modal.createCustomModal(newDestinationPopup);
  return destinationPopUpModal;
}

export { createDestinationCard, createDestinationPopUp };
