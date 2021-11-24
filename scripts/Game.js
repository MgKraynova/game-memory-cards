class Game {
  constructor(card) {
  this._card = card;
  this._isFirstCardSAlreadyFlipped = false;
  }

  _defineNumberOfCard(evt) {
    console.log(evt);
    const currentCard = evt.target.parentElement;
    let firstCard;
    let secondCard;

    if (!this._isFirstCardSAlreadyFlipped) {
      firstCard = currentCard;
      this._isFirstCardSAlreadyFlipped = true;
      console.log('это первая карта');
    } else {
      secondCard = currentCard;
      this._isFirstCardSAlreadyFlipped = false;
      console.log('это вторая карта');
    }
  }

  _checkForMatch(evt) {
    this._defineNumberOfCard(evt);

    if (firstCard.id === secondCard.id) {
      //заблокировать
      firstCard.isDisabled = true;
      secondCard.isDisabled = true;
      console.log('блокируем карты');
    } else {
      // перевернуть
      firstCard.addFlipAnimation();
      secondCard.addFlipAnimation();
      console.log('переворачиваем обратно карты');
    }
  }

  setEventListeners() {
    this._card.addEventListener('click', () => {
      this._checkForMatch();
    } );
  }
}

const cardElements = Array.from(document.querySelectorAll('.card'));

cardElements.forEach((card) => {
  const cardGame = new Game(card);
  cardGame.setEventListeners();
})


