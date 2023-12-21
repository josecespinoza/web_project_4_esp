import { createPopupWithImage, createCard } from "./utils.js";
import { globalConfig, sectionConfig } from "./config.js";
import Section from "../components/Section.js";
import Avatar from "../components/Avatar.js";
import UserInfo from "../components/UserInfo.js";

const renderAvatar = (imageUrl) => {
  const avatar = new Avatar(globalConfig.profileAvatarSelector);
  avatar.setAvatarImageUrl(imageUrl);
};

const renderUserInfo = (name, about) => {
  const userInfo = new UserInfo(
    globalConfig.profileNameSelector,
    globalConfig.profileOccupationSelector
  );
  userInfo.setUserInfo(name, about);
};

const renderCards = (
  cards,
  deleteHandler,
  appendType = sectionConfig.additionTypePrepend
) => {
  const cardsSection = new Section(
    {
      items: cards,
      renderer: (card) => {
        const cardPopup = createPopupWithImage(card.link, card.name);
        const cardElement = createCard(
          card._id,
          card.name,
          card.link,
          cardPopup.open,
          deleteHandler
        );
        cardsSection.addItem(cardElement, appendType);
      },
    },
    globalConfig.cardsContainerSelector
  );
  cardsSection.renderer();
};

export { renderAvatar, renderUserInfo, renderCards };
