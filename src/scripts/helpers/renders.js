import { createPopupWithImage } from "./utils.js";
import { globalConfig, sectionConfig, cardConfig } from "./config.js";
import Section from "../components/Section.js";
import Avatar from "../components/Avatar.js";
import Card from "../components/Card.js";
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
  userId,
  cards,
  deleteHandler,
  likeHandler,
  appendType = sectionConfig.additionTypePrepend
) => {
  const cardsSection = new Section(
    {
      items: cards,
      renderer: (cardData) => {
        const cardPopup = createPopupWithImage(cardData.link, cardData.name);
        const card = new Card(
          cardData._id,
          cardData.name,
          cardData.link,
          cardData.likes.length,
          cardPopup.open,
          deleteHandler
        );
        const cardElement = card.buildCard();
        card.setLikeHandler(likeHandler);
        const isLiked = cardData.likes.some((someUser) => {
          return someUser._id === userId;
        });
        card.setStatus(
          isLiked ? cardConfig.unlikedStatus : cardConfig.likedStatus
        );
        card.toggleLikeButton();
        cardsSection.addItem(cardElement, appendType);
      },
    },
    globalConfig.cardsContainerSelector
  );
  cardsSection.renderer();
};

export { renderAvatar, renderUserInfo, renderCards };
