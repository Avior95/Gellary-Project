import Card from "../models/Card.js";

let id = 1;
let nextUserId = 1;

const initialCard = () => {
  let cardArr = [
    new Card(
      id++,
      "Light Tower",
      42,
      `Light Tower`,
      "./assets/imgs/img1.jpg",
      "https://www.pexels.com/photo/lighthouse-1532771/",
      "Akko"
    ),
    new Card(
      id++,
      "A floating oil ball",
      38,
      `A floating oil ball`,
      "./assets/imgs/img2.jpg",
      "https://www.pexels.com/photo/dandelion-grayscale-photography-21323/",
      "Evil oil man"
    ),
    new Card(
      id++,
      "Heavenly elements",
      46,
      `Heavenly elements`,
      "./assets/imgs/img3.jpg",
      "https://www.pexels.com/photo/calm-body-of-water-2239485/",
      "Earth"
    ),
    new Card(
      id++,
      "Moon spores",
      36,
      `Moon spores`,
      "./assets/imgs/img4.jpg",
      "https://www.pexels.com/photo/dandelion-grayscale-photography-21323/",
      "Gaya"
    ),
    new Card(
      id++,
      "Horse with no name",
      49,
      `Horse with no name`,
      "./assets/imgs/img5.jpg",
      "https://www.pexels.com/photo/black-horse-running-on-green-field-surrounded-with-trees-101667/",
      "Mr. White"
    ),
    new Card(
      id++,
      "The mushroom tree",
      32,
      "The mushroom tree",
      "./assets/imgs/img6.jpg",
      "https://www.pexels.com/photo/silhouette-of-tree-near-body-of-water-during-golden-hour-36717/",
      "Fantastic fungi"
    ),
    new Card(
      id++,
      "Our place in space",
      27,
      `Our place in space`,
      "./assets/imgs/img7.jpg",
      "https://www.pexels.com/photo/photo-of-supernova-in-galaxy-3805983/",
      "Merkaba"
    ),
    new Card(
      id++,
      "In to the void",
      30,
      `In to the void`,
      "./assets/imgs/img8.jpg",
      "https://www.pexels.com/photo/sky-earth-space-working-2156/",
      "The human kind"
    ),
  ];
  return cardArr;
};
const setInitialData = () => {
  let cards = localStorage.getItem("cards");
  if (cards) {
    return;
  }
  localStorage.setItem("cards", JSON.stringify(initialCard()));
  localStorage.setItem("nextid", id + "");
  localStorage.setItem("nextUserId", nextUserId + "");
};

setInitialData();

export { setInitialData, initialCard };
