import { globalConfig } from "./config.js";

const page = document.querySelector(globalConfig.pageSelector);

const initialCards = [
  {
    name: "Barcelona",
    link: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Paris",
    link: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Praga",
    link: "https://images.unsplash.com/photo-1564511287568-54483b52a35e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Gent",
    link: "https://images.unsplash.com/photo-1576014348818-da2d94117be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Roma",
    link: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
  },
  {
    name: "Milan",
    link: "https://images.unsplash.com/photo-1567760855784-589f09ed5dc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
  },
  {
    name: "Napoles",
    link: "https://images.unsplash.com/photo-1590663964384-e3bfac60bed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
  },
  {
    name: "Capri",
    link: "https://images.unsplash.com/photo-1549026841-dc1939a05b67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=826&q=80",
  },
  {
    name: "Londres",
    link: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
];

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
  initialCards,
  inputSetNameData,
  inputSetAboutMeData,
  inputSetTitleData,
  inputSetImageUrlData,
};
