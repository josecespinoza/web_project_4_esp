import { page, initialCards } from "./modules/constants.js";
import Card from "./modules/classes/Card.js";
import {
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
} from "./modules/utils.js";
import { globalConfig } from "./modules/config.js";
import Section from "./modules/classes/Section.js";
import PopupWithImage from "./modules/classes/PopupWithImage.js";

/* import Popup from "./modules/classes/Popup.js"; */

const editButton = page.querySelector(globalConfig.editProfileButtonSelector);
const addCardButton = page.querySelector(globalConfig.addCardButtonSelector);
editButton.addEventListener("click", handleEditProfileButtonClick);
addCardButton.addEventListener("click", handleAddCardButtonClick);

loadCards(initialCards);

function loadCards(cards) {
  const cardsSection = new Section(
    {
      items: cards,
      renderer: (cardItem) => {
        const imagePopup = new PopupWithImage(globalConfig.popupSelector, {
          imageUrl: cardItem.link,
          description: cardItem.name,
        });
        imagePopup.buildPopup();
        imagePopup.setEventListeners();
        const card = new Card(cardItem.name, cardItem.link, imagePopup.open);
        const cardElement = card.buildCard();
        cardsSection.addItem(cardElement);
      },
    },
    globalConfig.cardsContainerSelector
  );
  cardsSection.renderer();
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
  ".popup__content"
);
popupSection.renderer(); */

/* const popupWithImage = new PopupWithImage(globalConfig.popupSelector, {
  imageUrl:
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  description: "test",
});
popupWithImage.buildPopup();
popupWithImage.setEventListeners();
popupWithImage.open(); */
