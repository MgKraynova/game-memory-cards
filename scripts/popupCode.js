import Popup from "./Popup.js";
import startNewGame from "./gameCode.js";
import colorsForFrontImages from "./colorsForCards.js";
// ПЕРЕМЕННЫЕ

const popupGameVictory = new Popup('.popup_type_game-victory', 'popup_opened',
  '.popup__close-button', '.popup__start-button', handleStartGameButton);

const popupGameRules = new Popup('.popup_type_game-rules', 'popup_opened',
  '.popup__close-button');

const popupGameLoose = new Popup('.popup_type_game-loose', 'popup_opened',
  '.popup__close-button', '.popup__start-button', handleStartGameButton);

// const startGameButton = document.querySelector('.popup__start-button');
const startGameButtons = document.querySelectorAll('.popup__start-button');
const linkForGameRules = document.querySelector('.footer__link_type_game-rules');

// Функции, относящиеся к попапу

linkForGameRules.addEventListener('click', () => {
  popupGameRules.openPopup();
});

// startGameButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//  startNewGame(colorsForFrontImages)
//  });
// })

function handleStartGameButton() {
  startNewGame(colorsForFrontImages);
}

export {popupGameVictory, popupGameLoose};
