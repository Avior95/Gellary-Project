import PAGE from "../models/pageModel.js";
import { changePages } from "../routes/router.js";
let galleryDiv;
let cardArr;
let showDetails;
const chartIcon = document.getElementById("cart");

const initialCardGallery = (cardArrFromHomePage, showDetailsFromHomePage) => {
  galleryDiv = document.getElementById("home-page-cards-gallery-Injection");
  showDetails = showDetailsFromHomePage;
  updateCardsGallery(cardArrFromHomePage);
};

const updateCardsGallery = (cardsArrFromHomePage) => {
  cardArr = cardsArrFromHomePage;
  createGallery();
};

const createCard = (id, title, price, imgUrl, credits) => {
  return `<div  class="card col-12 col-md-6 col-xl-4 col-xxl-3 mb-2 px-0">
  <img  id="cardsTemplate-${id}" class="img-gallery-card"
    src="${imgUrl}"
    alt=""
    class="card-img-top"
    id="pic${id}"
  />
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p>Credits: <span class="fw-bold">${credits}</span></p>
    <hr />
    <div class="justify-content-between d-flex">
      <div>Price: <span class="fw-bold">${price}</span>$</div>
      <button id="cart-${id}" class="bi bi-bag cursor"></button>
    </div>
  </div>
</div>
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-");
  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("-");
  }
  return idFromId[1];
};

const handleImgClick = (ev) => {
  // console.log(getIdFromClick(ev));
  showDetails(getIdFromClick(ev));
};

const handleCartClick = () => {
  changePages(PAGE.PAGE404);
};

const clearEventListeners = (idKeyword, handleFunction) => {
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};
const createGallery = () => {
  let innerStr = "";
  clearEventListeners("cardsTemplate", handleImgClick);
  clearEventListeners("cart", handleCartClick);

  for (let card of cardArr) {
    innerStr += createCard(
      card.id,
      card.title,
      card.price,
      card.imgUrl,
      card.credits
    );
  }
  galleryDiv.innerHTML = innerStr;
  createBtnEventListener("cardsTemplate", handleImgClick);
  createBtnEventListener("cart", handleCartClick);
};
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialCardGallery, updateCardsGallery };
