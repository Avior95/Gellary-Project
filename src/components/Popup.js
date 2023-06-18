import Card from "../models/Card.js";
import getNextId from "../utils/getNextId.js";
import validateUrl from "../../validation/validateUrl.js";

let selectedCard, editCard;
const editCardPopupImgDisplay = document.getElementById(
  "editCardPopupImgDisplay"
);
const editCardPopupUrl = document.getElementById("editCardPopupUrl");
const editCardPopupDescription = document.getElementById(
  "editCardPopupDescription"
);
const editCardPopupPrice = document.getElementById("editCardPopupPrice");
const editCardPopupCredits = document.getElementById("editCardPopupCredits");
const editCardPopup = document.getElementById("editCardPopup");
const newPicTitle = document.getElementById("newPic-title");

const initPopup = (selectedCardFromHomePage, editCardFromHomePage) => {
  /*
      set data from selectedCard to html
      */
  if (selectedCardFromHomePage) {
    selectedCard = selectedCardFromHomePage;
  } else {
    selectedCard = new Card(getNextId(), "", 0, "", "", "");
    newPicTitle.innerHTML = `CREATE PICTURE`;
  }
  editCardPopupUrl.addEventListener("input", () => {
    let err = validateUrl(editCardPopupUrl.value);
    if (err.length === 0) {
      document.getElementById("url-alert").classList.add("d-none");
    } else {
      document.getElementById("url-alert").classList.remove("d-none");
      document.getElementById("url-alert").innerHTML = err.join("<br>");
    }
  });
  editCard = editCardFromHomePage;
  editCardPopupImgDisplay.src = selectedCard.imgUrl;
  editCardPopupUrl.value = selectedCard.url;
  editCardPopupDescription.value = selectedCard.description;
  editCardPopupCredits.value = selectedCard.credits;
  editCardPopupPrice.value = selectedCard.price;

  showPopup();
};
const showPopup = () => {
  editCardPopup.classList.remove("d-none");
};

const hidePopup = () => {
  editCardPopup.classList.add("d-none");
};

window.addEventListener("load", () => {
  editCardPopup.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "editCardPopup " &&
      ev.target.id !== "editCardPopupCancelBtn" &&
      ev.target.id !== "editCardPopupCancelBtnIcon"
    ) {
      return;
    }
    hidePopup();
  });
  document
    .getElementById("editCardPopupSaveBtn")
    .addEventListener("click", () => {
      selectedCard.imgUrl = editCardPopupUrl.value;
      selectedCard.url = editCardPopupUrl.value;
      selectedCard.title = editCardPopupDescription.value;
      selectedCard.credits = editCardPopupCredits.value;
      selectedCard.price = editCardPopupPrice.value;

      editCard(selectedCard);
      hidePopup();
    });
  editCardPopupUrl.addEventListener("input", () => {
    editCardPopupImgDisplay.src = editCardPopupUrl.value;
  });
});

export { initPopup, showPopup, hidePopup };
