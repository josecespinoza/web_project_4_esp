import { apiConfig } from "./config.js";
import * as apiHandler from "../components/Api.js";

//Gets name and occupation of the current user
const getUserInfo = () => {
  const { baseUrl, userInfoResource, getMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, userInfoResource, getMethod);
};

//Gets all stored cards
const getCards = () => {
  const { baseUrl, cardResource, getMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, cardResource, getMethod);
};

//Creates a new card with the provided name and link
const addCard = (name, link) => {
  const { baseUrl, cardResource, postMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, cardResource, postMethod, {
    name,
    link,
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//Deletes one card with the provided id
const deleteCard = (cardId) => {
  const { baseUrl, cardResource, deleteMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, `${cardResource}/${cardId}`, deleteMethod);
};

const updateAvatar = (imageUrl) => {
  const { baseUrl, avatarResource, patchMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, avatarResource, patchMethod, {
    avatar: imageUrl,
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//Updates the name and about description of the current user
const updateUserInfo = (name, about) => {
  const { baseUrl, userInfoResource, patchMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, userInfoResource, patchMethod, {
    name,
    about,
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//Likes a card
const likeCard = (userId) => {
  const { baseUrl, likeResource, putMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, `${likeResource}/${userId}`, putMethod);
};

//Dislikes a card
const dislikeCard = (userId) => {
  const { baseUrl, likeResource, deleteMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, `${likeResource}/${userId}`, deleteMethod);
};

//Abstracts Api requests to facilitate reusability
const apiRequestsHandler = (baseUrl, resource, method, body = null) => {
  const { token } = apiConfig;
  const api = apiHandler.getInstance({
    baseUrl: `${baseUrl}${resource}`,
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const apiMethods = {
    GET: api.get,
    PUT: api.put,
    POST: api.post,
    PATCH: api.patch,
    DELETE: api.delete,
  };

  return apiMethods[method]();
};

const requests = {
  getUserInfo,
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
  updateAvatar,
  updateUserInfo,
};

export default requests;
