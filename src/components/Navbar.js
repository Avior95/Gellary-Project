import getNextId from "../utils/getNextId.js";
import checkIfBusiness from "../utils/checkBusiness.js";
import checkIfConnected from "../utils/checkIfConnected.js";

let showPopup;
let isConnected;
let nextId;
let isBusiness;
let navAddNewPicLink;

const navBeforeLogin = document.getElementById("navBeforeLogin");
const navAfterLogin = document.getElementById("navAfterLogin");

const initializeNavbar = (showPopupFromApp) => {
  nextId = getNextId();
  isBusiness = checkIfBusiness();
  isConnected = checkIfConnected();

  if (isConnected) {
    navBeforeLogin.classList.add("d-none");
    navAfterLogin.classList.remove("d-none");
  }
  showPopup = showPopupFromApp;

  navAddNewPicLink = document.getElementById("nav-addPic-link");
  if (!isBusiness) {
    navAddNewPicLink.classList.add("d-none");
  }
  navAddNewPicLink.addEventListener("click", () => {
    showPopup();
  });
};
export default initializeNavbar;
