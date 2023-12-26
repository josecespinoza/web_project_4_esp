import Form from "../components/Form.js";
import InputSet from "../components/InputSet.js";
import Avatar from "../components/Avatar.js";
import UserInfo from "../components/UserInfo.js";
import { globalConfig } from "./config.js";
import {
  inputSetAvatarData,
  inputSetAboutMeData,
  inputSetImageUrlData,
  inputSetNameData,
  inputSetTitleData,
} from "./constants.js";

const createEditAvatarForm = () => {
  const inputSets = [];
  const inputSetAvatarSrc = new InputSet(inputSetAvatarData);
  inputSets.push(inputSetAvatarSrc.buildFormInputSet());
  const avatar = new Avatar(globalConfig.profileAvatarSelector);
  inputSetAvatarSrc.setInputValue(avatar.getAvatarImageUrl());
  const newForm = new Form("Cambiar foto de perfil", "Guardar", inputSets);
  return newForm.buildForm();
};

const createEditProfileForm = () => {
  const inputSets = [];
  const inputSetName = new InputSet(inputSetNameData);
  const inputSetAboutMe = new InputSet(inputSetAboutMeData);
  inputSets.push(
    inputSetName.buildFormInputSet(),
    inputSetAboutMe.buildFormInputSet()
  );
  const userInfo = new UserInfo(
    globalConfig.profileNameSelector,
    globalConfig.profileOccupationSelector
  );
  inputSetName.setInputValue(userInfo.getUserInfo().userName);
  inputSetAboutMe.setInputValue(userInfo.getUserInfo().userJob);
  const newForm = new Form("Editar Perfil", "Guardar", inputSets);
  return newForm;
};

const createAddCardForm = () => {
  const inputSets = [];
  const inputSetTitle = new InputSet(inputSetTitleData);
  const inputSetImageUrl = new InputSet(inputSetImageUrlData);
  inputSets.push(
    inputSetTitle.buildFormInputSet(),
    inputSetImageUrl.buildFormInputSet()
  );
  const newCardForm = new Form("Nuevo Lugar", "Guardar", inputSets);
  return newCardForm.buildForm();
};

const createDeleteCardForm = () => {
  const newCardDeleteForm = new Form("¿Estás seguro?", "Sí");
  return newCardDeleteForm.buildForm();
};

export {
  createEditAvatarForm,
  createEditProfileForm,
  createAddCardForm,
  createDeleteCardForm,
};
