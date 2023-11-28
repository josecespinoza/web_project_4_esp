import { initialCards } from "./modules/constants.js";
import {
  setPageButtonHandler,
  loadCards,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
} from "./modules/utils.js";
import { globalConfig } from "./modules/config.js";

setPageButtonHandler(
  globalConfig.editProfileButtonSelector,
  handleEditProfileButtonClick
);
setPageButtonHandler(
  globalConfig.addCardButtonSelector,
  handleAddCardButtonClick
);

loadCards(initialCards);
