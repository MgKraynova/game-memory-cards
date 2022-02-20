class Card {
  constructor(cardSelector, colorForFrontCard, handleCardClickFunction) {
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._colorForFrontCard = colorForFrontCard;
    this._handleCardClick = handleCardClickFunction;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _shuffleCard() {
    const randomPos = Math.floor(Math.random() * 12);
    this._element.style.order = randomPos;
  }

  _setEventListeners() {
    this._element.addEventListener('click', this._handleCardClick);
  }

  removeEventListeners() {
    this._element.removeEventListener('click', this._handleCardClick);
  } // todo удалить, если не нужно

  createCard() {
    const frontImage = this._element.querySelector('.card-front');
    frontImage.style.backgroundColor = this._colorForFrontCard;

    this._element.setAttribute('id', `${this._colorForFrontCard}`);
    this._shuffleCard();

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
