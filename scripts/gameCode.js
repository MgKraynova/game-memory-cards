let firstCard;
let secondCard;
let numberOfFoundMatches = 0;
let numberOfDisabledCards = 0;

const cards = document.querySelectorAll('.card');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const startGameButton = document.querySelector('.popup__start-button');

closeButton.addEventListener('click', closePopup);
startGameButton.addEventListener('click', () => {
  startNewGame(colorsForFrontImages)
});


const counterOfDisabledCards = document.getElementById('counter-of-disabled-cards');
const totalNumberOfCards = document.getElementById('total-number-of-cards');

counterOfDisabledCards.innerText = '0';
totalNumberOfCards.innerText = `${cards.length}`;


function isAllCardsOpened() {
  if (numberOfFoundMatches === (cards.length/2)) {
    openPopup();
  }
}

function openPopup() {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
}

function closePopupByPressEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
}

function checkCard(event) {
  console.log(event.target);
  updateCounter();
  if ((firstCard) && (secondCard)) {
    console.log('Это баг!');
  } else if (!firstCard) {
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
  numberOfDisabledCards = numberOfDisabledCards + 2;


  firstCard.setAttribute('data-isDisabled', 'true');
  secondCard.setAttribute('data-isDisabled', 'true');
}

function showAnimationForDisabledCards() {
  console.log('Эта карта заблокирована, выберете другую карту');
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
    console.log('карты одинаковые');
    makeCardsDisabled(firstCard, secondCard);
    firstCard.addEventListener('click', showAnimationForDisabledCards);
    secondCard.addEventListener('click', showAnimationForDisabledCards);
    numberOfFoundMatches = numberOfFoundMatches + 1;
    updateCounter();
    console.log(numberOfFoundMatches);
    console.log(`Вы отгадали ${numberOfDisabledCards} из ${cards.length} карточек`);
    setTimeout(isAllCardsOpened, 1000);
  } else {
    console.log('карты разные');
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
    card.addEventListener('click', checkCard); //todo найти баг
  });
  closePopup();
}


cards.forEach((card) => {
  card.addEventListener('click', checkCard);
})


