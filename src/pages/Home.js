import {
  initialCardGallery,
  updateCardsGallery,
} from "../components/CardGallery.js";
import { initialCardList, updateCardList } from "../components/CardList.js";
import {
  initialCardCarousel,
  updateCardCarousel,
} from "../components/CardCarousel.js";
import checkIfBusiness from "../utils/checkBusiness.js";
import { initPopup } from "../components/Popup.js";
import { initDetails } from "../pages/Details.js";
let cardArr, originalCardsArr;
let displayNow;
let isBusiness;
let homeDisplayList;
let homeDisplayGallery;
let homeDisplayCousel;
let cardsGallery;
let cardsList;
let cardsCarusel;
let searchArea = document.getElementById("homeDisplaySearch");

window.addEventListener("load", () => {
  cardArr = localStorage.getItem("cards");
  if (!cardArr) {
    return;
  }
  cardArr = JSON.parse(cardArr);
  originalCardsArr = [...cardArr];
  isBusiness = checkIfBusiness();
  initialCardGallery(cardArr, showDetails);
  initialCardList(cardArr, isBusiness, showPopup, deleteCard);
  initialCardCarousel(cardArr);
  initializeElements();
  initializeBtns();
});
const initializeElements = () => {
  /* btns */
  homeDisplayList = document.getElementById("homeDisplayList");
  homeDisplayGallery = document.getElementById("homeDisplayGallery");
  homeDisplayCousel = document.getElementById("homeDisplayCousel");
  /* divs */
  cardsGallery = document.getElementById("cards-Gallery-container");
  cardsList = document.getElementById("cards-table-container");
  cardsCarusel = document.getElementById("cards-carusel-container");
  displayNow = cardsCarusel;
  displayToDisplay(displayNow);
};

const initializeBtns = () => {
  homeDisplayList.addEventListener("click", () => {
    displayToDisplay(cardsList);
    showSearch();
  });
  homeDisplayGallery.addEventListener("click", () => {
    displayToDisplay(cardsGallery);
    hideSearch();
  });
  homeDisplayCousel.addEventListener("click", () => {
    displayToDisplay(cardsCarusel);
    hideSearch();
  });
  document
    .getElementById("homeDisplaySortASC")
    .addEventListener("click", () => {
      sortCards();
    });
  document
    .getElementById("homeDisplaySortDESC")
    .addEventListener("click", () => {
      sortCards(false);
    });
  document
    .getElementById("homeDisplaySearch")
    .addEventListener("input", (ev) => {
      let regex = new RegExp("^" + ev.target.value, "i");
      // console.log(regex);
      cardArr = originalCardsArr.filter((item) => {
        let reg = regex.test(item.title);
        // console.log("item.title", item.title, " reg", reg);
        return reg;
      });
      updateDisplays();
    });
};

const showSearch = () => {
  searchArea.classList.remove("d-none");
};
const hideSearch = () => {
  searchArea.classList.add("d-none");
};
const displayToDisplay = (toDisplay) => {
  displayNow.classList.remove("d-block");
  displayNow.classList.add("d-none");
  toDisplay.classList.remove("d-none");
  toDisplay.classList.add("d-block");
  displayNow = toDisplay;
};

const updateDisplays = () => {
  updateCardsGallery(cardArr);
  updateCardList(cardArr);
  updateCardCarousel(cardArr);
};

const saveToLocalStorage = (arrToSave) => {
  localStorage.setItem("cards", JSON.stringify(arrToSave));
};
const deleteCard = (id) => {
  id = +id; //convert string to number
  originalCardsArr = originalCardsArr.filter((item) => item.id !== id);
  saveToLocalStorage(originalCardsArr);
  cardArr = cardArr.filter((item) => item.id !== id); //delete property by index
  updateDisplays();
};

const sortCards = (asc = true) => {
  if (asc) {
    cardArr.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    cardArr.sort((a, b) => b.title.localeCompare(a.title));
  }
  updateDisplays();
};
const showPopup = (id) => {
  let selectedCard = cardArr.find((item) => item.id === +id);
  if (!selectedCard) {
    return;
  }
  initPopup(selectedCard, editCard);
};
const showDetails = (id) => {
  let selectedCard = cardArr.find((item) => item.id === +id);
  if (!selectedCard) {
    return;
  }
  initDetails(selectedCard, editCard);
};

const showNewPopup = () => {
  initPopup(undefined, addNewCard);
};
const addNewCard = (newCard) => {
  originalCardsArr = [...originalCardsArr, newCard];
  let nextId = +newCard.id + 1;
  localStorage.setItem("nextid", nextId + "");
  cardArr = [...originalCardsArr];
  editCard();
};

const editCard = () => {
  saveToLocalStorage(originalCardsArr);
  updateDisplays();
};

export { showNewPopup };
