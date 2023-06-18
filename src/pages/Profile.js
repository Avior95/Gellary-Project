import validateName from "../../validation/validateName.js";
import validateEmail from "../../validation/validateEmail.js";
import validateLestName from "../../validation/validateLestName.js";
import validatePassword from "../../validation/validatePassword.js";
// Name inputs
const inputName = document.getElementById("firstName-profile-input");
const inputLestName = document.getElementById("lastName-profile-input");
const inputBiz = document.getElementById("isBiz-profile-checkBox");
// Means of contact inputs
const inputEmail = document.getElementById("email-profile-input");
const inputPhone = document.getElementById("phone-profile-input");
// Security inputs
const inputPassword = document.getElementById("password-profile-input");
const inputReEnterPassword = document.getElementById(
  "password-reenter-profile-field"
);
// Address input
const inputState = document.getElementById("state-profile-input");
const inputCountry = document.getElementById("country-profile-input");
const inputCity = document.getElementById("city-profile-input");
const inputStreet = document.getElementById("street-profile-input");
const inputHouse = document.getElementById("house-profile-input");
const inputZipCode = document.getElementById("zip-profile-input");
// BTN
const updateBtn = document.getElementById("update-profile-btn");

let nameOk = false;
let emailOk = false;
let passwordOk = false;
let lestNameOk = false;
let reEnter = false;

window.addEventListener("load", () => {
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    //we have users
    users = JSON.parse(users);
    token = JSON.parse(token);
    let user = users.find((item) => item.id === token.id);
    if (user) {
      inputName.value = user.name.name;
      inputLestName.value = user.name.lastName;
      inputEmail.value = user.contact.email;
      inputPassword.value = user.security.password;
      inputState.value = user.address.state;
      inputCountry.value = user.address.country;
      inputCity.value = user.address.city;
      inputStreet.value = user.address.street;
      inputHouse.value = user.address.house;
      inputZipCode.value = user.address.zipCode;
      inputPhone.value = user.contact.Phone;
      inputBiz.checked = user.checkBox;
    }
  }

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
    document.getElementById("profile-alert-name").classList.add("d-none");
    nameOk = true;
  } else {
    document.getElementById("profile-alert-name").classList.remove("d-none");
    document.getElementById("profile-alert-name").innerHTML = err.join("<br>");
    nameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkLestNameInput = () => {
  let err = validateLestName(inputLestName.value);
  if (err.length === 0) {
    document.getElementById("profile-alert-lestName").classList.add("d-none");
    lestNameOk = true;
  } else {
    document
      .getElementById("profile-alert-lestName")
      .classList.remove("d-none");
    document.getElementById("profile-alert-lestName").innerHTML =
      err.join("<br>");
    lestNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let err = validateEmail(inputEmail.value);
  if (err.length === 0) {
    document.getElementById("profile-alert-Email").classList.add("d-none");
    emailOk = true;
  } else {
    document.getElementById("profile-alert-Email").classList.remove("d-none");
    document.getElementById("profile-alert-Email").innerHTML = err.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    inputPassword.classList.remove("is-invalid");
    document.getElementById("profile-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("profile-alert-password")
      .classList.remove("d-none");
    document.getElementById("profile-alert-password").innerHTML =
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
  (updateBtn.disabled = !(
    nameOk &&
    emailOk &&
    passwordOk &&
    lestNameOk &&
    reEnter
  ));

updateBtn.addEventListener("click", () => {
  if (!(nameOk && emailOk && passwordOk && lestNameOk && reEnter)) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    token = JSON.parse(token);
    let userEmail = users.find((item) => item.email === inputEmail.value);
    console.log(userEmail);
    let user = users.find((item) => item.id === token.id);
    if (userEmail && user.id !== userEmail.id) {
      //the email already token
      console.log("email already token ");
      return;
    }
    if (user) {
      user.name.lastName = token.lestName = inputLestName.value;
      user.name.name = token.name = inputName.value;
      user.contact.email = token.email = inputEmail.value;
      user.security.password = token.password = inputPassword.value;
      user.contact.Phone = token.Phone = inputPhone.value;
      user.address.zipCode = token.zipCode = inputZipCode.value;
      user.address.house = token.house = inputHouse.value;
      user.address.street = token.street = inputStreet.value;
      user.address.city = token.city = inputCity.value;
      user.address.country = token.country = inputCountry;
      user.address.state = token.state = inputState.value;
      if (inputBiz.checked === false) {
        user.checkBox = token.business = inputBiz.checked;
      } else if (inputBiz.checked === true) {
        user.checkBox = token.business = inputBiz.checked;
      }
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("token", JSON.stringify(token));
      console.log("SAVED");
    }
  }
  setTimeout(() => {
    location.reload();
  }, 3000);
});
