import { apiConfig } from "./config.js";
import Api from "../components/Api.js";

const getUserInfo = () => {
  const { baseUrl, userInfoResource, getMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, userInfoResource, getMethod);
};

const getCards = () => {
  const { baseUrl, cardResource, getMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, cardResource, getMethod);
};

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

const likeCard = (userId) => {
  const { baseUrl, likeResource, putMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, `${likeResource}/${userId}`, putMethod);
};

const dislikeCard = (userId) => {
  const { baseUrl, likeResource, deleteMethod } = apiConfig;
  return apiRequestsHandler(baseUrl, `${likeResource}/${userId}`, deleteMethod);
};

const apiRequestsHandler = (baseUrl, resource, method, body) => {
  const { token } = apiConfig;
  const api = new Api({
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

export {
  getUserInfo,
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard,
  updateAvatar,
  updateUserInfo,
};
