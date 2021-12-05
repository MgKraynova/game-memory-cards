// ПЕРЕМЕННЫЕ
const popupGameVictory = document.querySelector('.popup_type_game-victory');
const closeButtonInPopupGameVictory = popupGameVictory.querySelector('.popup__close-button');

const popupGameRules = document.querySelector('.popup_type_game-rules');
const closeButtonInPopupGameRules = popupGameRules.querySelector('.popup__close-button');

const popupGameLoose = document.querySelector('.popup_type_game-loose');
const closeButtonInPopupGameLoose = popupGameLoose.querySelector('.popup__close-button');

// const startGameButton = document.querySelector('.popup__start-button');
const startGameButtons = document.querySelectorAll('.popup__start-button');
const linkForGameRules = document.querySelector('.footer__link_type_game-rules');

// Функции, относящиеся к попапу
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
}

function closePopupByPressEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
}

closeButtonInPopupGameVictory.addEventListener('click',() => {
  closePopup(popupGameVictory);
});

closeButtonInPopupGameRules.addEventListener('click',() => {
  closePopup(popupGameRules);
});

closeButtonInPopupGameLoose.addEventListener('click',() => {
  closePopup(popupGameLoose);
});

linkForGameRules.addEventListener('click', () => {
  openPopup(popupGameRules);
});

startGameButtons.forEach((button) => {
  button.addEventListener('click', () => {
 startNewGame(colorsForFrontImages)
 });
})


// class Popup {
//   constructor(popupSelector, classToMakePopupVisible, closeButtonSelector, selectorForElementThatOpensPopup) {
//     this._popup = document.querySelector(popupSelector);
//     this._classToMakePopupVisible = classToMakePopupVisible;
//     this._closeButton = this._popup.querySelector(closeButtonSelector);
//     this._selectorForElementThatOpensPopup = selectorForElementThatOpensPopup;
//     this._elementThatOpensPopup = document.querySelector(this._selectorForElementThatOpensPopup);
//   }
//
//   openPopup() {
//     this._popup.classList.add(this._classToMakePopupVisible);
//     this.setEventListeners();
//     document.addEventListener('keydown', this._handleEscClose);
//   }
//
//   closePopup() {
//     this._popup.classList.remove(this._classToMakePopupVisible);
//     document.removeEventListener('keydown', this._handleEscClose);
//   }
//
//   _handleEscClose() {
//     if (evt.key === 'Escape') {
//       this.closePopup()
//     }
//   }
//
//   setEventListeners() {
//     this._closeButton.addEventListener('click', this.closePopup);
//   }
// }

