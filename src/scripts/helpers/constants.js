import { globalConfig } from "./config.js";

const page = document.querySelector(globalConfig.pageSelector);

const inputSetAvatarData = {
  type: "url",
  name: "avatarUrl",
  placeholder: "Enlace a la imagen",
  isRequired: true,
  maxlength: 500,
  minlength: null,
};

const inputSetNameData = {
  type: "text",
  name: "name",
  placeholder: "Nombre",
  isRequired: true,
  maxlength: 40,
  minlength: 2,
};

const inputSetAboutMeData = {
  type: "text",
  name: "aboutMe",
  placeholder: "Acerca de mí",
  isRequired: true,
  maxlength: 200,
  minlength: 2,
};

const inputSetTitleData = {
  type: "text",
  name: "title",
  placeholder: "Título",
  isRequired: true,
  maxlength: 30,
  minlength: 2,
};

const inputSetImageUrlData = {
  type: "url",
  name: "imageUrl",
  placeholder: "Enlace a la imagen",
  isRequired: true,
  maxlength: 500,
  minlength: null,
};

export {
  page,
  inputSetAvatarData,
  inputSetNameData,
  inputSetAboutMeData,
  inputSetTitleData,
  inputSetImageUrlData,
};
