import { page } from "./constants.js";
import * as modal from "./modal.js";

function createDestinationCard(destination) {
  const destinationCardClone = document
    .querySelector("#destinations__item-template")
    .content.cloneNode(true);
  const destinationCard = destinationCardClone.querySelector(
    ".destinations__item"
  );
  destinationCard.querySelector(".destination__name").textContent =
    destination.name;
  const destinationPhoto = destinationCard.querySelector(".destination__photo");
  destinationPhoto.setAttribute("alt", destination.name);
  destinationPhoto.setAttribute("src", destination.link);
  setDestinationCardListeners(destinationCard);
  return destinationCard;
}

function setDestinationCardListeners(destinationCard) {
  const destinationPhoto = destinationCard.querySelector(".destination__photo");
  destinationPhoto.addEventListener("click", handleDestinationCardClick);
  const destinationLikeButton = destinationCard.querySelector(
    ".button__icon_action_like"
  );
  destinationLikeButton.addEventListener("click", handleLikeButtonClick);
  const destinationDeleteButton = destinationCard.querySelector(
    ".button__icon_action_delete"
  );
  destinationDeleteButton.addEventListener("click", handleDeleteButtonClick);
}

function removeDestinationCardListeners(destinationCard) {
  debugger;
  const destinationPhoto = destinationCard.querySelector(".destination__photo");
  destinationPhoto.removeEventListener("click", handleDestinationCardClick);
  const destinationLikeButton = destinationCard.querySelector(
    ".button__icon_action_like"
  );
  destinationLikeButton.removeEventListener("click", handleLikeButtonClick);
  const destinationDeleteButton = destinationCard.querySelector(
    ".button__icon_action_delete"
  );
  destinationDeleteButton.removeEventListener("click", handleDeleteButtonClick);
}

function handleDestinationCardClick(evt) {
  const description = evt.target.alt;
  const imageUrl = evt.target.src;
  const destinationPopUp = createDestinationPopUp(imageUrl, description);
  destinationPopUp.classList.toggle("modal-container_state_closed");
  modal.openModal(destinationPopUp);
}

function handleLikeButtonClick(evt) {
  const clickedButton = evt.target;
  if (clickedButton.classList.contains("button__icon_action_like")) {
    clickedButton.classList.remove("button__icon_action_like");
    clickedButton.classList.add("button__icon_action_liked");
  } else {
    clickedButton.classList.remove("button__icon_action_liked");
    clickedButton.classList.add("button__icon_action_like");
  }
}

function handleDeleteButtonClick(evt) {
  const card = evt.target.closest(".destinations__item");
  removeDestinationCardListeners(card);
  card.remove();
}

function createDestinationPopUp(imageUrl, description) {
  const destinationPopUpTemplate = page.querySelector(
    "#destination-popup-template"
  );
  const newDestinationPopup = destinationPopUpTemplate.cloneNode(true).content;
  const destinationPhoto = newDestinationPopup.querySelector(
    ".destination-popup__photo"
  );
  destinationPhoto.setAttribute("src", imageUrl);
  destinationPhoto.setAttribute("alt", description);
  const destinationDescription = newDestinationPopup.querySelector(
    ".destination-popup__description"
  );
  destinationDescription.textContent = description;

  const destinationPopUpModal = modal.createCustomModal(newDestinationPopup);
  return destinationPopUpModal;
}

export { createDestinationCard, createDestinationPopUp };
