import { page, initialCards } from "./modules/constants.js";
import Card from "./modules/classes/Card.js";
import {
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
} from "./modules/utils.js";
import { globalConfig } from "./modules/config.js";

const editButton = page.querySelector(globalConfig.editProfileButtonSelector);
const addCardButton = page.querySelector(globalConfig.addCardButtonSelector);
editButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);

loadDestinationCards(...initialCards);

function loadDestinationCards(...destinationCards) {
  const destinationsContainer = document.querySelector(
    globalConfig.cardsContainerSelector
  );
  destinationCards.forEach((destination) => {
    const card = new Card(destination.name, destination.link);
    const cardElement = card.buildCard();
    destinationsContainer.append(cardElement);
  });
}
