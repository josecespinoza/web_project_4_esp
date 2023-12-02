import { initialCards } from "./modules/constants.js";
import {
  setPageButtonHandler,
  renderCards,
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

renderCards(...initialCards);
