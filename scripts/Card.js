import colorsForFrontImages from "../utils/colorsForCards.js";
class Card {
  constructor(cardSelector, colorForFrontCard) {
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._colorForFrontCard = colorForFrontCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  addFlipAnimation() {
    const front = this._element.querySelector('.card-front');
    const back = this._element.querySelector('.card-back');

    front.classList.toggle('front-animation');
    back.classList.toggle('card-back-animation');
  }

  _shuffleCard() {
    const randomPos = Math.floor(Math.random() * 12);
    this._element.style.order = randomPos;
  }

    createCard() {
      const frontImage = this._element.querySelector('.card-front');
      frontImage.style.backgroundColor = this._colorForFrontCard;

      this._element.setAttribute('id', `${this._colorForFrontCard}`);
      this._shuffleCard();

      return this._element;
    }
}

const cardsContainer = document.querySelector('.cards');

function addCard(color) {
  const card = new Card('.template', color);
  const cardElement = card.createCard();
  cardsContainer.prepend(cardElement);
}

function createColorCards(colors) {
  colors.forEach((color) => {
    addCard(color);
  });
}

createColorCards(colorsForFrontImages);

export default createColorCards;
