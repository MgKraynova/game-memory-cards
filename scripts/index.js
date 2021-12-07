import {popupGameLoose} from "./popupCode.js";

const startScreen = document.querySelector('.start-screen');
const startButtonAtFirstScreen = document.querySelector('.start-screen__button');

const timeScreen = document.querySelector('.time-screen');
// const timeButtons = document.querySelectorAll('.time-screen__button');
const timer = document.getElementById('timer');

let timeForGame;

function moveScreenUp(screen) {
  screen.classList.add('move-screen-up');
};

startButtonAtFirstScreen.addEventListener('click', () => {
  moveScreenUp(startScreen);
})

// timeButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     moveScreenUp(timeScreen);
//   })
// })

const timeButtonsContainer = document.querySelector('.time-screen__wrapper');

timeButtonsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-screen__button')) {
    timeForGame = parseInt(event.target.dataset.time);
    console.log(event.target.dataset.time);
    setInterval(decreaseTime, 1000);
    moveScreenUp(timeScreen);
  }
})

function decreaseTime() {
  if (timeForGame === 0) {
    popupGameLoose.openPopup();
    console.log('открываем попап о проигрыше');
    document.querySelectorAll('.card').forEach((card) => {
    card.removeEventListener('click', checkCard);
      console.log('блокируем карты');
    });
  } else {
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
