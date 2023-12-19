import "./pages/index.css";
import { initialCards, page } from "./scripts/helpers/constants.js";
import {
  setPageButtonHandler,
  renderCards,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
  loadUserInfo,
} from "./scripts/helpers/utils.js";
import { globalConfig } from "./scripts/helpers/config.js";

loadUserInfo();

setPageButtonHandler(
  globalConfig.editProfileButtonSelector,
  handleEditProfileButtonClick
);

setPageButtonHandler(
  globalConfig.addCardButtonSelector,
  handleAddCardButtonClick
);

renderCards(...initialCards);
