import { initialCards } from "../scripts/modules/constants.js";
import {
  setPageButtonHandler,
  renderCards,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
} from "../scripts/modules/utils.js";
import { globalConfig } from "../scripts/modules/config.js";

setPageButtonHandler(
  globalConfig.editProfileButtonSelector,
  handleEditProfileButtonClick
);
setPageButtonHandler(
  globalConfig.addCardButtonSelector,
  handleAddCardButtonClick
);

renderCards(...initialCards);
