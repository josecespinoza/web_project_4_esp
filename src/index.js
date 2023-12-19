import "./pages/index.css";
import { initialCards, page } from "./scripts/helpers/constants.js";
import {
  setPageButtonHandler,
  renderCards,
  loadUserInfo,
} from "./scripts/helpers/utils.js";
import {
  handleEditAvatarButtonClick,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
} from "./scripts/helpers/handlers.js";
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

setPageButtonHandler(
  globalConfig.editAvatarButtonSelector,
  handleEditAvatarButtonClick
);

renderCards(...initialCards);
