import "./pages/index.css";
import { setPageButtonHandler } from "./scripts/helpers/utils.js";
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
} from "./scripts/helpers/handlers.js";

getUserInfo()
  .then((data) => {
    renderUserInfo(data.name, data.about);
    renderAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

getCards()
  .then((data) => {
    renderCards(
      data,
      handleDeleteCardButtonClick,
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
