import PAGE from "../models/pageModel.js";

const HOME = document.getElementById(PAGE.HOME);
const ABOUT = document.getElementById(PAGE.ABOUT);
const SIGNUP = document.getElementById(PAGE.SIGNUP);
const LOGIN = document.getElementById(PAGE.LOGIN);
const PROFILE = document.getElementById(PAGE.PROFILE);
const PAGE404PAGELINK = document.getElementById(PAGE.PAGE404);

const changePages = (pageToDisplay) => {
  HOME.classList.remove("d-block");
  ABOUT.classList.remove("d-block");
  SIGNUP.classList.remove("d-block");
  LOGIN.classList.remove("d-block");
  PROFILE.classList.remove("d-block");
  PAGE404PAGELINK.classList.remove("d-block");

  HOME.classList.add("d-none");
  ABOUT.classList.add("d-none");
  SIGNUP.classList.add("d-none");
  LOGIN.classList.add("d-none");
  PROFILE.classList.add("d-none");
  PAGE404PAGELINK.classList.add("d-none");

  switch (pageToDisplay) {
    case PAGE.HOME:
      HOME.classList.remove("d-none");
      HOME.classList.add("d-block");
      break;
    case PAGE.ABOUT:
      ABOUT.classList.remove("d-none");
      ABOUT.classList.add("d-block");
      break;
    case PAGE.SIGNUP:
      SIGNUP.classList.remove("d-none");
      SIGNUP.classList.add("d-block");
      break;
    case PAGE.LOGIN:
      LOGIN.classList.remove("d-none");
      LOGIN.classList.add("d-block");
      break;
    case PAGE.PROFILE:
      PROFILE.classList.remove("d-none");
      PROFILE.classList.add("d-block");
      break;
    default:
      PAGE404PAGELINK.classList.remove("d-none");
      PAGE404PAGELINK.classList.add("d-block");
      break;
  }
};

export { changePages };
