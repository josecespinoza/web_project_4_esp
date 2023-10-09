import { page, initialCards } from "./modules/constants.js";
import Card from "./modules/classes/Card.js";
import {
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
} from "./modules/utils.js";
import { globalConfig } from "./modules/config.js";
import Section from "./modules/classes/Section.js";

/* import Popup from "./modules/classes/Popup.js"; */

const editButton = page.querySelector(globalConfig.editProfileButtonSelector);
const addCardButton = page.querySelector(globalConfig.addCardButtonSelector);
editButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);

loadDestinationCards(initialCards);

function loadDestinationCards(destinationCards) {
  const section = new Section(
    {
      items: destinationCards,
      renderer: (cardItem) => {
        const card = new Card(cardItem.name, cardItem.link);
        section.addItem(card.buildCard());
      },
    },
    globalConfig.cardsContainerSelector
  );
  section.renderer();
}

/* const card = new Card("test", "test");

const popup = new Popup(globalConfig.popupSelector);
const popupSection = new Section(
  {
    items: [card],
    renderer: (card) => {
      popup.buildPopup();
      popup.setEventListeners();
      popup.open();
      popupSection.addItem(card.buildCard());
    },
  },
  popup.getContentSelector()
); */
//popupSection.renderer();
