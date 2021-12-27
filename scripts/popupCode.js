import Popup from "./Popup.js";
import PopupWithSubmitButton from "./PopupWithSubmitButton.js";
import {startNewGame} from "./gameCode.js";
import colorsForFrontImages from "../utils/colorsForCards.js";
// ПЕРЕМЕННЫЕ

const popupGameVictory = new PopupWithSubmitButton('.popup_type_game-victory',
   handleStartGameButton);
popupGameVictory.setEventListeners();

const popupGameRules = new Popup('.popup_type_game-rules');
popupGameRules.setEventListeners();

const popupGameLoose = new PopupWithSubmitButton('.popup_type_game-loose',
    handleStartGameButton);
popupGameLoose.setEventListeners();


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
