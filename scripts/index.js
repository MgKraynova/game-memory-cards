const startScreen = document.querySelector('.start-screen');
const startButtonAtFirstScreen = document.querySelector('.start-screen__button');

const timeScreen = document.querySelector('.time-screen');
const timeButtons = document.querySelectorAll('.time-screen__button');

function moveScreenUp(screen) {
  screen.classList.add('move-screen-up');
};

startButtonAtFirstScreen.addEventListener('click', () => {
  moveScreenUp(startScreen);
})

timeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    moveScreenUp(timeScreen);
  })
})
