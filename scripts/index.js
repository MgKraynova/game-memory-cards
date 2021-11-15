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
  if (this === firstCard) return; // если игрок снова щелкнул по первой карточке, ничего не делаем

  this.classList.add('flip-animation');

  // условие сработает, если это первая перевернутая карточка
  if (!hasFlippedCard) {
    hasFlippedCard = true; // после клика указываем, что первая карта перевернута
    firstCard = this;
    //return;
  } else { // условие применяется, если карточка, на которую кликают - вторая
    secondCard = this;
    checkForMatch();
  }
}

cards.forEach(card => card.addEventListener('click', flipCard));

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

