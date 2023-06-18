import PAGE from "./src/models/pageModel.js";
import { changePages } from "./src/routes/router.js";
import "./src/pages/SignUp.js";
import "./src/pages/Login.js";
import "./src/pages/Home.js";
import "./src/pages/Details.js";
import "./src/pages/Profile.js";
import "./src/initialData/initialData.js";
import initializeNavbar from "./src/components/Navbar.js";
import { showNewPopup } from "./src/pages/Home.js";
import checkIfConnected from "./src/utils/checkIfConnected.js";

const naveHome = document.getElementById("nav-home-link");
const navAbout = document.getElementById("nav-about-link");
const navLogin = document.getElementById("nav-loginus-link");
const navSignUp = document.getElementById("nav-signUp-link");
const navEditProfilePage = document.getElementById("nav-edit-profile-page");
const navLogout = document.getElementById("nav-logout");
// const chartIcon = document.getElementById("chart-icon");

window.addEventListener("load", () => {
  initializeNavbar(showNewPopup);
  if (checkIfConnected()) {
    let user = localStorage.getItem("token");
    user = JSON.parse(user);
    navEditProfilePage.innerText = user.name;
  }
});
naveHome.addEventListener("click", () => {
  changePages(PAGE.HOME);
});
navAbout.addEventListener("click", () => {
  changePages(PAGE.ABOUT);
});
navLogin.addEventListener("click", () => {
  changePages(PAGE.LOGIN);
});
navSignUp.addEventListener("click", () => {
  changePages(PAGE.SIGNUP);
});
navEditProfilePage.addEventListener("click", () => {
  changePages(PAGE.PROFILE);
});

navLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});
