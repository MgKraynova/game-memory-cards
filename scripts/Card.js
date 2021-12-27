import colorsForFrontImages from "../utils/colorsForCards.js";
class Card {
  constructor(cardSelector, frontImageSelector, backImageSelector, frontImageAnimationClass, backImageAnimationClass, colorForFrontCard) {
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._frontImageSelector = frontImageSelector;
    this._backImageSelector = backImageSelector;
    this._frontImageAnimationClass = frontImageAnimationClass;
    this._backImageAnimationClass = backImageAnimationClass;
    this._colorForFrontCard = colorForFrontCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  addFlipAnimation() {
    const front = this._element.querySelector(this._frontImageSelector);
    const back = this._element.querySelector(this._backImageSelector);

    front.classList.toggle(this._frontImageAnimationClass);
    back.classList.toggle(this._backImageAnimationClass);
  }

  _shuffleCard() {
    const randomPos = Math.floor(Math.random() * 12);
    this._element.style.order = randomPos;
  }

    createCard() {
      const frontImage = this._element.querySelector(this._frontImageSelector);
      frontImage.style.backgroundColor = this._colorForFrontCard;

      this._element.setAttribute('id', `${this._colorForFrontCard}`);
      this._shuffleCard();

      return this._element;
    }
}

const cardsContainer = document.querySelector('.cards');

function addCard(color) {
  const card = new Card('.template', '.card-front', '.card-back',
    'front-animation', 'card-back-animation', color);
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
