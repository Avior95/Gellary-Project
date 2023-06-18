let galleryDiv;
let cardArr;
let isBusiness;
let deleteCard;
let showPopup;

const initialCardList = (
  cardFormeHomePage,
  isBusinessParam,
  showPopupFromHomePage,
  deletePropertyFromHomePage
) => {
  galleryDiv = document.getElementById("home-page-cards-table-Injection");
  isBusiness = isBusinessParam;
  deleteCard = deletePropertyFromHomePage;
  showPopup = showPopupFromHomePage;

  updateCardList(cardFormeHomePage);
};

const updateCardList = (cardFormeHomePage) => {
  cardArr = cardFormeHomePage;
  createList();
};
const createListItem = (title, imgUrl, url, credits, id) => {
  const BusinessBtn = ` <td> <button type="button"id="cardsListEditBtn-${id}"><i class="bi bi-pencil-square cursor"
 ></i></button></td>
 <td><button type="button" id="cardsListDeleteBtn-${id}"><i class="bi bi-trash3-fill cursor" ></i></button></td>`;

  const editTh = `Edit`;
  const deleteTh = `Delete`;
  return `  
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Image</th>
                                <th>Src</th>
                                <th>Title</th>
                                <th>Credits</th>
                                <th>${isBusiness ? editTh : ""}</th>
                                <th>${isBusiness ? deleteTh : ""}</th>
                            </tr>
                        </thead>
                        <tbody id="tbody"></tbody>
                        <tr>
                            <td>${id}</td>
                            <td>
                                <img style= width:50px;height:37.5px;" src="${imgUrl}"alt="${title}" />
                            </td>
                            <td>
                                ${url}
                            </td>
                            <td>${title}</td>
                            <td>${credits}</td>
                            ${isBusiness ? BusinessBtn : ""}
                          
                        </tr>
                    `;
};
const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-");
  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("-");
  }
  return idFromId[1];
};
const handleDeleteBtnClick = (ev) => {
  deleteCard(getIdFromClick(ev));
};
const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev));
};

const clearEventListeners = (idKeyword, handleFunction) => {
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createList = () => {
  let innerStr = "";
  clearEventListeners("cardsListDeleteBtn", handleDeleteBtnClick);
  clearEventListeners("cardsListEditBtn", handleEditBtnClick);
  for (let card of cardArr) {
    innerStr += createListItem(
      card.title,
      card.imgUrl,
      card.url,
      card.credits,
      card.id
    );
  }
  galleryDiv.innerHTML = innerStr;
  createBtnEventListener("cardsListDeleteBtn", handleDeleteBtnClick);
  createBtnEventListener("cardsListEditBtn", handleEditBtnClick);
};
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialCardList, updateCardList };
