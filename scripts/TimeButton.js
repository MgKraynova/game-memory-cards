class TimeButton {
  constructor(timeButtonId, handleTimeButtonClick) {
    this._timeButtonElement = document.getElementById(timeButtonId);
    this._handleTimeButtonClick = handleTimeButtonClick;
    this._handleTimeButtonClick = this._handleTimeButtonClick.bind(this._timeButtonElement);
  }

  setEventListeners() {
    this._timeButtonElement.addEventListener('click', this._handleTimeButtonClick);
  }

  removeEventListeners() {
    this._timeButtonElement.removeEventListener('click', this._handleTimeButtonClick);
  } //todo удалить, если не нужно
}

export default TimeButton;
