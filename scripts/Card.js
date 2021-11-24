class Card {
  constructor(cardSelector, frontImageSelector, backImageSelector, frontImageAnimationClass, backImageAnimationClass, colorForFrontCard) {
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._frontImageSelector = frontImageSelector;
    this._backImageSelector = backImageSelector;
    this._frontImageAnimationClass = frontImageAnimationClass;
    this._backImageAnimationClass = backImageAnimationClass;
    this._colorForFrontCard = colorForFrontCard;
    this.isDisabled = false;
    this._isFirstCardSAlreadyFlipped = false;
    this._firstCard = '';
    this._secondCard ='';
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  addFlipAnimation() {
    const front = this._element.querySelector(this._frontImageSelector);
    const back = this._element.querySelector(this._backImageSelector);

    if (!this.isDisabled) {
      front.classList.toggle(this._frontImageAnimationClass);
      back.classList.toggle(this._backImageAnimationClass);
    }
  }




  _defineNumberOfCard() {

    if (!this._isFirstCardSAlreadyFlipped) {
      this._firstCard = this;
      this._isFirstCardSAlreadyFlipped = true;
      console.log('это первая карта');
    } else {
      this._secondCard = this;
      this._isFirstCardSAlreadyFlipped = false;
      console.log('это вторая карта');
    }
  }

  _checkForMatch() {
    this._defineNumberOfCard();

    if (this._firstCard.id === this._secondCard.id) {
      //заблокировать
      this._firstCard.isDisabled = true;
      this._secondCard.isDisabled = true;
      console.log('блокируем карты');
    } else {
      // перевернуть
      this._firstCard.addFlipAnimation();
      this._secondCard.addFlipAnimation();
      console.log('переворачиваем обратно карты');
    }
  }
















  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this.addFlipAnimation();
      this._checkForMatch();
    });
  }

    createCard() {
      this._setEventListeners();

      const frontImage = this._element.querySelector(this._frontImageSelector);
      frontImage.style.backgroundColor = this._colorForFrontCard;

      this._element.setAttribute('id', `${this._colorForFrontCard}`);

      return this._element;
    }
}

const blockCards = document.querySelector('.cards');

function addCard(color) {
  const card = new Card('.template', '.front', '.back',
    'front-animation', 'back-animation', color);
  const cardElement = card.createCard();
  blockCards.prepend(cardElement);
}

colorsForFrontImages.forEach((color) => {
  addCard(color);
});
