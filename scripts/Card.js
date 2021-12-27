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

export default Card;
