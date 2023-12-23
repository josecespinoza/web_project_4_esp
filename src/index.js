import "./pages/index.css";
import {
  setPageButtonHandler,
  setCurrentUserId,
  getCurrentUserId,
} from "./scripts/helpers/utils.js";
import { getUserInfo, getCards } from "./scripts/helpers/requests.js";
import { globalConfig, sectionConfig } from "./scripts/helpers/config.js";
import {
  renderUserInfo,
  renderAvatar,
  renderCards,
} from "./scripts/helpers/renders.js";
import {
  handleEditAvatarButtonClick,
  handleEditProfileButtonClick,
  handleAddCardButtonClick,
  handleDeleteCardButtonClick,
  handleLikeCardButtonClick,
} from "./scripts/helpers/handlers.js";

getUserInfo()
  .then((userData) => {
    setCurrentUserId(userData._id);
    renderUserInfo(userData.name, userData.about);
    renderAvatar(userData.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

getCards()
  .then((cardData) => {
    renderCards(
      cardData,
      handleDeleteCardButtonClick,
      handleLikeCardButtonClick,
      sectionConfig.additionTypeAppend
    );
  })
  .catch((err) => {
    console.log(err);
  });

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
