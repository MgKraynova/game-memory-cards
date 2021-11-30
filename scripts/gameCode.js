// ПЕРЕМЕННЫЕ

let firstCard;
let secondCard;
let numberOfFoundMatches = 0;
let numberOfDisabledCards = 0;

const debug = false; // константа для отладки
const cards = document.querySelectorAll('.card');

const counterOfDisabledCards = document.getElementById('counter-of-disabled-cards');
const totalNumberOfCards = document.getElementById('total-number-of-cards');

const linkForStartGame = document.querySelector('.footer__link_type_new-game');

// НАЧАЛЬНЫЕ ЗНАЧЕНИЯ ПЕРЕМЕННЫХ

counterOfDisabledCards.innerText = '0';
totalNumberOfCards.innerText = `${cards.length}`;

// ФУНКЦИИ

// Функции, относящиеся к функционалу игры
function isAllCardsOpened() {
  if (numberOfFoundMatches === (cards.length/2)) {
    openPopup(popupGameVictory);
  }
}

function checkCard() {
  updateCounter();
  if (!firstCard) {
    firstCard = this;
    flipCard(firstCard);
    if (debug) {
      console.log('первая карта');
    }
  } else if (firstCard && !(this === firstCard)) {
    secondCard = this;
    flipCard(secondCard);
    checkIfCardsAreMatched();
    if (debug) {
      console.log('вторая карта');
    }
  } else if (this === firstCard) {
    if (debug) {
      console.log('вы уже открыли эту карточку, мы ее закрываем');
    }
    firstCard = null;
    unFlipCard(this);
  }
}

function flipCard(card) {
  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');

  front.classList.add('card-front-animation');
  back.classList.add('card-back-animation');
}

function unFlipCardWithTimeout(card) {
  setTimeout(unFlipCard, 1200, card);
}

function unFlipCard(card) {
  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');
  front.classList.remove('card-front-animation');
  back.classList.remove('card-back-animation');
}

function makeCardsDisabled(firstCard, secondCard) {
  firstCard.removeEventListener('click', checkCard);
  secondCard.removeEventListener('click', checkCard);
  if (debug) {
    console.log('блокируем карты');
  }
  numberOfDisabledCards = numberOfDisabledCards + 2;

  firstCard.setAttribute('data-isDisabled', 'true');
  secondCard.setAttribute('data-isDisabled', 'true');
}

function showAnimationForDisabledCards() {
  if (debug) {
    console.log('Эта карта заблокирована, выберете другую карту');
  }
  // todo добавить анимацию для заблокированных карт
}

function updateCounter() {
  counterOfDisabledCards.innerText = `${numberOfDisabledCards}`;
}

function setCounterToZero() {
  numberOfFoundMatches = 0;
  numberOfDisabledCards = 0;
  updateCounter();
}

function checkIfCardsAreMatched() {
  if (firstCard.id === secondCard.id) {
    if (debug) {
      console.log('карты одинаковые');
    }
    makeCardsDisabled(firstCard, secondCard);
    firstCard.addEventListener('click', showAnimationForDisabledCards);
    secondCard.addEventListener('click', showAnimationForDisabledCards);
    numberOfFoundMatches = numberOfFoundMatches + 1;
    updateCounter();
    setTimeout(isAllCardsOpened, 1000);
  } else {
    if (debug) {
      console.log('карты разные');
    }
    unFlipCardWithTimeout(firstCard);
    unFlipCardWithTimeout(secondCard);
  }
  firstCard = null;
  secondCard = null;
}

function deleteCards() {
  Array.from(document.querySelectorAll('.card')).forEach((card) => {
   card.remove();
   card.removeAttribute('data-isDisabled');
  })
}

function startNewGame(colors) {
  deleteCards();
  setCounterToZero();
  createColorCards(colors);
  Array.from(document.querySelectorAll('.card')).forEach((card) => {
    card.addEventListener('click', checkCard);
  });
  closePopup(popupGameVictory); // todo нужно рефакторить, либо передавать как аргумент, либо менять
}

// Иное
cards.forEach((card) => {
  card.addEventListener('click', checkCard);
})

startGameButton.addEventListener('click', () => {
  startNewGame(colorsForFrontImages)
});

linkForStartGame.addEventListener('click', () => {
  setTimeout(startNewGame, 500, colorsForFrontImages);
});

