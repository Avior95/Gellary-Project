import validateEmail from "../../validation/validateEmail.js";
import validatePassword from "../../validation/validatePassword.js";
import { changePages } from "../routes/router.js";
import PAGE from "../models/pageModel.js";

const inputLoginEmail = document.getElementById("login-email");
const inputLoginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("submit-login-btn");

inputLoginEmail.addEventListener("input", () => {
  let err = validateEmail(inputLoginEmail.value);
  if (err.length === 0) {
    document.getElementById("login-email-error").classList.add("d-none");
    // emailOk = true;
  } else {
    document.getElementById("login-email-error").classList.remove("d-none");
    document.getElementById("login-email-error").innerHTML = err.join("<br>");
  }
});

inputLoginPassword.addEventListener("input", () => {
  let err = validatePassword(inputLoginPassword.value);
  if (err.length === 0) {
    document.getElementById("login-password-error").classList.add("d-none");
  } else {
    document.getElementById("login-password-error").classList.remove("d-none");
    document.getElementById("login-password-error").innerHTML =
      err.join("<br>");
  }
});

loginBtn.addEventListener("click", () => {
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  if (!users) {
    console.log("Empty");
    return;
  }
  let user = users.find(
    (item) =>
      item.contact.email === inputLoginEmail.value &&
      item.security.password === inputLoginPassword.value
  );
  if (!user) {
    console.log("invalid email and/or password");
    return;
  }
  localStorage.setItem(
    "token",
    JSON.stringify({
      id: user.id,
      name: user.name.name,
      lestName: user.name.lastName,
      password: user.security.password,
      email: user.contact.email,
      Phone: user.contact.Phone,
      house: user.address.house,
      city: user.address.city,
      street: user.address.street,
      country: user.address.country,
      state: user.address.state,
      zipCode: user.address.zipCode,
      business: user.checkBox,
    })
  );
  location.reload();
});
