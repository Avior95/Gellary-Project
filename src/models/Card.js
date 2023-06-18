class Card {
  id;
  title;
  price;
  description;
  imgUrl;
  url;
  credits;

  constructor(id, title, price, description, imgUrl, url, credits) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.url = url;
    this.credits = credits;
  }
}
export default Card;
