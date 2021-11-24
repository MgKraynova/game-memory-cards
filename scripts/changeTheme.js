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
