let firstCard;
let secondCard;
let numberOfFoundMatches = 0;
let numberOfDisabledCards = 0;

const cards = document.querySelectorAll('.card');


const counterOfDisabledCards = document.getElementById('counter-of-disabled-cards');
const totalNumberOfCards = document.getElementById('total-number-of-cards');

counterOfDisabledCards.innerText = '0';
totalNumberOfCards.innerText = `${cards.length}`;


function isAllCardsOpened() {
  if (numberOfFoundMatches === (cards.length/2)) {
    alert('Вы победили!');
  }
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


cards.forEach((card) => {
  card.addEventListener('click', checkCard);
})


