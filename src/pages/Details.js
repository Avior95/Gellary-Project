const h1TitleDetails = document.getElementById("h1-title-details");
const h2TitleDetails = document.getElementById("h2-title-details");
const creditsDetails = document.getElementById("credits-details");
const priceDetails = document.getElementById("price-details");
const idDetails = document.getElementById("id-details");
const UrlDetails = document.getElementById("Url-details");
const imgDetails = document.getElementById("img-details");
const picDetailsContainer = document.getElementById("pic-details-container");
const cardsGalleryContainer = document.getElementById(
  "cards-Gallery-container"
);
const iconsContainer = document.getElementById("icons-container");
const navHomeLink = document.getElementById("nav-home-link");

let selectedCard;
const initDetails = (selectedCardFromHomePage, editCardFromHomePage) => {
  selectedCard = selectedCardFromHomePage;
  h1TitleDetails.innerHTML = selectedCard.title;
  h2TitleDetails.innerHTML = selectedCard.title;
  creditsDetails.innerHTML = selectedCard.credits;
  priceDetails.innerHTML = selectedCard.price;
  idDetails.innerHTML = selectedCard.id;
  UrlDetails.innerHTML = selectedCard.url;
  imgDetails.src = selectedCard.imgUrl;
  showDetails();
};

const showDetails = () => {
  cardsGalleryContainer.classList.add("d-none");
  iconsContainer.classList.add("d-none");
  picDetailsContainer.classList.remove("d-none");
};

navHomeLink.addEventListener("click", () => {
  hideDetails();
});
const hideDetails = () => {
  picDetailsContainer.classList.add("d-none");
  cardsGalleryContainer.classList.remove("d-none");
  iconsContainer.classList.remove("d-none");
};

export { initDetails, showDetails, hideDetails };
