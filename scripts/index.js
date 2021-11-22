// получаем массив всех карточек
const cards = Array.from(document.querySelectorAll('.card'));

let hasFlippedCard = false; // по умолчанию у всех карт стоит значение, что они не перевернуты
let firstCard;
let secondCard;
let lockBoard = false;

// добавляет или удаляет класс flip-animation карточкам
// Когда мы нажимаем первую карту, она должна ждать, пока другая карта не будет перевернута.
function flipCard() {
  if (lockBoard) return; // если игрок пытывается открыть третью карточку, ничего не делаем
  else if (this === firstCard) return; // если игрок снова щелкнул по первой карточке, ничего не делаем

  this.classList.add('flip-animation');

  // условие сработает, если это первая перевернутая карточка
  if (!hasFlippedCard) {
    hasFlippedCard = true; // после клика указываем, что первая карта перевернута
    firstCard = this;
    return;
  } else { // условие применяется, если карточка, на которую кликают - вторая
    secondCard = this;
    checkForMatch();
    return;
  }
}


function checkForMatch() {
  if (firstCard.dataset.picture === secondCard.dataset.picture) {
    disableCards();
    // return;
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true; // нужно для блокировки переворачивания карт

  setTimeout(() => {
    firstCard.classList.remove('flip-animation');
    secondCard.classList.remove('flip-animation');
    resetBoard();
  }, 1200)
}

// сбрасываем раунд
function resetBoard() {
  lockBoard = false; // возвращаем возможность открывать карты
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

cards.forEach(() => shuffle());
cards.forEach(card => card.addEventListener('mousedown', flipCard));

const linkForVioletTheme = document.getElementById('violet-theme');
const linkForDarkTheme = document.getElementById('dark-theme');
const pageElement = document.querySelector('.page');
const linkForDarkVioletTheme = document.getElementById('dark-violet-theme');
const linkForOrangeTheme = document.getElementById('orange-theme');
const linkForGreenTeam = document.getElementById('green-theme');
const linkForPastelTheme = document.getElementById('pastel-theme');
const linkForBlueTheme = document.getElementById('blue-theme');
const linkForDarkBlueTheme = document.getElementById('dark-blue-theme');

function changeTheme(backgroundColor, textColor, cardBackgroundColor) {
  pageElement.style.background = backgroundColor;
  pageElement.style.color = textColor;
  cards.forEach((card) => {
    card.style.background = cardBackgroundColor;
  })
}

linkForDarkTheme.addEventListener('click', () => {
  changeTheme('#FFFFFF','#1F2633', '#ff6148');
});

linkForVioletTheme.addEventListener('click', () => {
  changeTheme('rgb(225,227,254)','rgb(126, 130, 186)', 'rgb(126, 130, 186)');
});

linkForDarkVioletTheme.addEventListener('click', () => {
  changeTheme('rgb(214,218,228)','rgb(255,255,255)', 'rgb(113,53,132)');
});

linkForOrangeTheme.addEventListener('click', () => {
  changeTheme('rgb(255,91,78)','rgb(1,22,8)', 'rgb(255,255,255)');
});

linkForGreenTeam.addEventListener('click', () => {
  changeTheme('rgb(133,195,188)','rgb(235,251,254)', 'rgb(2,61,78)');
});

linkForPastelTheme.addEventListener('click', () => {
  changeTheme('rgb(100,150,119)','rgb(235,251,254)', 'rgb(228,175,145)'); //rgb(162,192,161)
});

linkForBlueTheme.addEventListener('click', () => {
  changeTheme('rgb(147,214,209)','rgb(172,180,191)', 'rgb(39,49,75)'); //rgb(162,192,161)
});

linkForDarkBlueTheme.addEventListener('click', () => {
  changeTheme('rgb(16,21,46)','rgb(172,180,191)', '#6b74bf'); //rgb(162,192,161)
});

