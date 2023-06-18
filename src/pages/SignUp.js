import validateName from "../../validation/validateName.js";
import validateEmail from "../../validation/validateEmail.js";
import validateLestName from "../../validation/validateLestName.js";
import validatePassword from "../../validation/validatePassword.js";
import { User, Name, Address, Contact, Security } from "../models/User.js";
import { changePages } from "../routes/router.js";
import PAGE from "../models/pageModel.js";
// Name inputs
const inputName = document.getElementById("firstName-signup-input");
const inputLestName = document.getElementById("lastName-signup-input");
const inputBiz = document.getElementById("isBiz-signup-checkBox");
// Means of contact inputs
const inputEmail = document.getElementById("email-signup-input");
const inputPhone = document.getElementById("phone-signup-input");
// Security inputs
const inputPassword = document.getElementById("password-signup-input");
const inputReEnterPassword = document.getElementById(
  "password-reenter-signup-field"
);
// Address input
const inputState = document.getElementById("state-signup-input");
const inputCountry = document.getElementById("country-signup-input");
const inputCity = document.getElementById("city-signup-input");
const inputStreet = document.getElementById("street-signup-input");
const inputHouse = document.getElementById("house-signup-input");
const inputZipCode = document.getElementById("zip-signup-input");
// BTN
const submitBtn = document.getElementById("submit-signup-user-btn");

let nameOk = false;
let emailOk = false;
let passwordOk = false;
let lestNameOk = false;
let reEnter = false;

window.addEventListener("load", () => {
  if (inputName.value !== "") {
    checkNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputLestName.value !== "") {
    checkLestNameInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
  if (inputReEnterPassword.value !== "") {
    checkPasswordReEnterInput();
  }
});

inputName.addEventListener("input", () => {
  checkNameInput();
});
inputEmail.addEventListener("input", () => {
  checkEmailInput();
});
inputLestName.addEventListener("input", () => {
  checkLestNameInput();
});
inputPassword.addEventListener("input", () => {
  checkPasswordInput();
});
inputReEnterPassword.addEventListener("input", () => {
  checkPasswordReEnterInput();
});

const checkNameInput = () => {
  let err = validateName(inputName.value);
  if (err.length === 0) {
    document.getElementById("signUp-alert-name").classList.add("d-none");
    nameOk = true;
  } else {
    document.getElementById("signUp-alert-name").classList.remove("d-none");
    document.getElementById("signUp-alert-name").innerHTML = err.join("<br>");
    nameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkLestNameInput = () => {
  let err = validateLestName(inputLestName.value);
  if (err.length === 0) {
    document.getElementById("signUp-alert-lestName").classList.add("d-none");
    lestNameOk = true;
  } else {
    document.getElementById("signUp-alert-lestName").classList.remove("d-none");
    document.getElementById("signUp-alert-lestName").innerHTML =
      err.join("<br>");
    lestNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let err = validateEmail(inputEmail.value);
  if (err.length === 0) {
    document.getElementById("signUp-alert-Email").classList.add("d-none");
    emailOk = true;
  } else {
    document.getElementById("signUp-alert-Email").classList.remove("d-none");
    document.getElementById("signUp-alert-Email").innerHTML = err.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    inputPassword.classList.remove("is-invalid");
    document.getElementById("signUp-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    inputPassword.classList.add("is-invalid");
    document.getElementById("signUp-alert-password").classList.remove("d-none");
    document.getElementById("signUp-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordReEnterInput = () => {
  let errorArr = validatePassword(inputReEnterPassword.value);
  if (errorArr.length === 0) {
    inputReEnterPassword.classList.remove("is-invalid");
    document
      .getElementById("password-reenter-profile-field-alert")
      .classList.add("d-none");
    reEnter = true;
  } else {
    inputReEnterPassword.classList.add("is-invalid");
    document
      .getElementById("password-reenter-profile-field-alert")
      .classList.remove("d-none");
    document.getElementById("password-reenter-profile-field-alert").innerHTML =
      errorArr.join("<br>");
    reEnter = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (submitBtn.disabled = !(
    nameOk &&
    emailOk &&
    passwordOk &&
    lestNameOk &&
    reEnter
  ));

submitBtn.addEventListener("click", () => {
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  let checkBox = false;
  let name = new Name(inputName.value, inputLestName.value);
  let address = new Address(
    inputState.value,
    inputCountry.value,
    inputCity.value,
    inputStreet.value,
    inputHouse.value,
    inputZipCode.value
  );
  let contact = new Contact(inputEmail.value, inputPhone.value);
  let security = new Security(inputPassword.value);

  let newUser = new User(
    nextUserId++,
    name,
    contact,
    address,
    security,
    checkBox
  );
  localStorage.setItem("nextUserId", nextUserId + "");
  if (!users) {
    users = [newUser];
    if (inputBiz.checked) {
      newUser.checkBox = true;
    }
    if (inputPassword.value !== inputReEnterPassword.value) {
      console.log("Password error");
      return;
    }
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users = JSON.parse(users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        console.log("email already exists");
        return;
      }
    }
    if (inputBiz.checked) {
      newUser.checkBox = true;
    }

    if (inputPassword.value !== inputReEnterPassword.value) {
      console.log("Password error");
      return;
    }

    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  changePages(PAGE.LOGIN);
});
