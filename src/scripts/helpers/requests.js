import { apiConfig } from "./config.js";
import Api from "../components/Api.js";

const getUserInfo = () => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.userInfoResource,
    apiConfig.getMethod
  );
};

const getCards = () => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.cardResource,
    apiConfig.getMethod
  );
};

const addCard = ({ name, link }) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.cardResource,
    apiConfig.postMethod,
    {
      name,
      link,
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteCard = (cardId) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    `${apiConfig.cardResource}/${cardId}`,
    apiConfig.deleteMethod
  );
};

const updateAvatar = (imageUrl) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.avatarResource,
    apiConfig.patchMethod,
    {
      avatar: imageUrl,
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUserInfo = (name, about) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    apiConfig.userInfoResource,
    apiConfig.patchMethod,
    {
      name,
      about,
    }
  )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCard = (userId) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    `${apiConfig.likeResource}/${userId}`,
    apiConfig.putMethod
  );
};

const dislikeCard = (userId) => {
  return apiRequestsHandler(
    apiConfig.baseUrl,
    `${apiConfig.likeResource}/${userId}`,
    apiConfig.deleteMethod
  );
};

const apiRequestsHandler = (baseUrl, resource, method, body) => {
  const api = new Api({
    baseUrl: `${baseUrl}${resource}`,
    headers: {
      authorization: `${apiConfig.token}`,
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
