

let firstCard;
let secondCard;
let numberOfFoundMatches = 0;

function isAllCardsOpened() {
  if (numberOfFoundMatches === (cards.length/2)) {
    alert('Вы победили!');
  }
}

function checkCard(event) {
  console.log(event.target);
  if (!firstCard) {
    firstCard = this;
    flipCard(firstCard);
    console.log('первая карта');
  } else if (firstCard && !(this === firstCard)) {
    secondCard = this;
    flipCard(secondCard);
    checkIfCardsAreMatched();
    console.log('вторая карта');
  } else if (this === firstCard) {
    console.log('вы уже открыли эту карточку, мы ее закрываем');
    firstCard = null;
    unFlipCard(this);
  }
}

function flipCard(card) {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');

  front.classList.add('front-animation');
  back.classList.add('back-animation');
}

function unFlipCardWithTimeout(card) {
  setTimeout(unFlipCard, 1200, card);
}

function unFlipCard(card) {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');
  front.classList.remove('front-animation');
  back.classList.remove('back-animation');
}

function makeCardsDisabled(firstCard, secondCard) {
  firstCard.removeEventListener('click', checkCard);
  secondCard.removeEventListener('click', checkCard);
  console.log('блокируем карты');


  firstCard.setAttribute('data-isDisabled', 'true');
  secondCard.setAttribute('data-isDisabled', 'true');
}

function showAnimationForDisabledCards() {
  console.log('Эта карта заблокирована, выберете другую карту');

}

function checkIfCardsAreMatched() {
  if (firstCard.id === secondCard.id) {
    console.log('карты одинаковые');
    makeCardsDisabled(firstCard, secondCard);
    firstCard.addEventListener('click', showAnimationForDisabledCards);
    secondCard.addEventListener('click', showAnimationForDisabledCards);
    numberOfFoundMatches = numberOfFoundMatches + 1;
    console.log(numberOfFoundMatches);
    setTimeout(isAllCardsOpened, 1000);
  } else {
    console.log('карты разные');
    unFlipCardWithTimeout(firstCard);
    unFlipCardWithTimeout(secondCard);
  }
  firstCard = null;
  secondCard = null;
}

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', checkCard);
})

















 // ОД ИЗ КЛАССА
// this.isDisabled = false;
// this._isFirstCardSAlreadyFlipped = false;
// this._firstCard = '';
// this._secondCard ='';
//
// _defineNumberOfCard() {
//   if (!this._isFirstCardSAlreadyFlipped) {
//     this._firstCard = this;
//     this._isFirstCardSAlreadyFlipped = true;
//     console.log('это первая карта');
//   } else {
//     this._secondCard = this;
//     this._isFirstCardSAlreadyFlipped = false;
//     console.log('это вторая карта');
//   }
// }
//
// _checkForMatch() {
//   this._defineNumberOfCard();
//
//   if (this._firstCard.id === this._secondCard.id) {
//     //заблокировать
//     this._firstCard.isDisabled = true;
//     this._secondCard.isDisabled = true;
//     console.log('блокируем карты');
//   } else {
//     // перевернуть
//     this._firstCard.addFlipAnimation();
//     this._secondCard.addFlipAnimation();
//     console.log('переворачиваем обратно карты');
//   }
// }
