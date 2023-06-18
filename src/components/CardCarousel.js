let carouselDiv;
let cardArr;

const initialCardCarousel = (cardArrFromHomePage) => {
  carouselDiv = carouselDiv = document.getElementById("innerCarousel");
  updateCardCarousel(cardArrFromHomePage);
};

const updateCardCarousel = (cardArrFromHomePage) => {
  cardArr = cardArrFromHomePage;
  createCarousel();
};

const createItem = (img, credits, title) => {
  return `<div class="carousel-item">
  <img style= width:400px;height:300px;" src="${img}" class="img-fluid d-block" alt="${title}">
  <p>Photo taken by: ${credits}</p>
</div>`;
};

const createCarousel = () => {
  let innerStr = "";
  for (let card of cardArr) {
    innerStr += createItem(card.imgUrl, card.credits, card.title);
  }
  carouselDiv.innerHTML = innerStr;
  carouselDiv.querySelector(".carousel-item").classList.add("active");
};

export { initialCardCarousel, updateCardCarousel };
