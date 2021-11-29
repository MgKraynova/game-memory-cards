// ПЕРЕМЕННЫЕ
const popupGameVictory = document.querySelector('.popup_type_game-victory');
const closeButtonInPopupGameVictory = popupGameVictory.querySelector('.popup__close-button');

const popupGameRules = document.querySelector('.popup_type_game-rules');
const closeButtonInPopupGameRules = popupGameRules.querySelector('.popup__close-button');

const startGameButton = document.querySelector('.popup__start-button');
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


linkForGameRules.addEventListener('click', () => {
  openPopup(popupGameRules);
})
