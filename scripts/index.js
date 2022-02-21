import colorsForFrontImages from "../utils/colorsForCards.js";
import SectionForCards from "./SectionForCards.js";
import PopupWithSubmitButton from "./PopupWithSubmitButton.js";
import Popup from "./Popup.js";
import Card from "./Card.js";
import TimeButton from "./TimeButton.js";

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССА

// Создание экземпляра Section
const cardList = new SectionForCards(createCard, '.cards');
cardList.renderItems(colorsForFrontImages);

//Создание экземпляров попапов
const popupGameVictory = new PopupWithSubmitButton('.popup_type_game-victory',
  handleStartGameButton);
popupGameVictory.setEventListeners();

const popupGameRules = new Popup('.popup_type_game-rules');
popupGameRules.setEventListeners();

const popupGameLoose = new PopupWithSubmitButton('.popup_type_game-loose',
  handleStartGameButton);
popupGameLoose.setEventListeners();

// Создание экземпляров timeButton

const timeButton30sec = new TimeButton('time-screen__button_30s', handleTimeButtonClick);
timeButton30sec.setEventListeners();

const timeButton45sec = new TimeButton('time-screen__button_45s', handleTimeButtonClick);
timeButton45sec.setEventListeners();

const timeButton60sec = new TimeButton('time-screen__button_60s', handleTimeButtonClick);
timeButton60sec.setEventListeners();

// ПЕРЕМЕННЫЕ

const cards = document.querySelectorAll('.card');

const linkForGameRules = document.querySelector('.footer__link_type_game-rules');
const linkForStartGame = document.querySelector('.footer__link_type_new-game');

const timer = document.getElementById('timer');

let timerId = undefined;
let timeForGame;
let firstCard;
let secondCard;
let numberOfFoundMatches = 0;
let numberOfDisabledCards = 0;
const counterOfDisabledCards = document.getElementById('counter-of-disabled-cards');
const totalNumberOfCards = document.getElementById('total-number-of-cards');

totalNumberOfCards.textContent = `${cards.length}`;

const debug = false; // константа для отладки

//ФУНКЦИИ

//Создание карточки
function createCard(color) {
  const card = new Card('.template', color, checkCard);

  const cardElement = card.createCard();

  cardList.addItem(cardElement);
}

function startNewGame(colors) {
  deleteCards();
  setCounterToZero();
  cardList.renderItems(colors);
  popupGameVictory.closePopup(); // todo нужно рефакторить, либо передавать как аргумент, либо менять
}

function handleStartGameButton() {
  startNewGame(colorsForFrontImages);
}

// Функции, относящиеся к функционалу игры
function isAllCardsOpened() {
  if (numberOfFoundMatches === (cards.length / 2)) {
    popupGameVictory.openPopup();
    clearInterval(timerId);
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
  setTimeout(unFlipCard, 1000, card);
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

function decreaseTime() {
  if (timeForGame === 0) {
    popupGameLoose.openPopup();
    console.log('открываем попап о проигрыше');
    document.querySelectorAll('.card').forEach((card) => {
      // card.removeEventListeners(); //todo убрать слушатели
      card.removeEventListener('click', checkCard);
      console.log('блокируем карты');
    });
    timeForGame = -1;
    console.log('уменьшили тайм фор гейм', timeForGame);
  } else if (timeForGame > 0) {
    let current = --timeForGame;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timer.innerHTML = `00:${value}`;
}

// УСТАНОВКА СЛУШАТЕЛЕЙ СОБЫТИЙ

linkForGameRules.addEventListener('click', () => {
  popupGameRules.openPopup();
});

linkForStartGame.addEventListener('click', () => {
  setTimeout(startNewGame, 500, colorsForFrontImages);
});

function handleTimeButtonClick() {
  timeForGame = parseInt(this.dataset.time);
  console.log(this.dataset.time);
  if (!(timerId === undefined)) {
    clearInterval(timerId);
  }
  timerId = setInterval(decreaseTime, 1000);
}



