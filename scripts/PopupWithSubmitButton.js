import Popup from "./Popup.js";

class PopupWithSubmitButton extends Popup {
  constructor(popupSelector, handleButtonFunction) {
    super(popupSelector);
    this._handleButtonFunction = handleButtonFunction;
    this._popupButton = this._popup.querySelector('.popup__start-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupButton.addEventListener('click', () => {
      this._handleButtonFunction();
      super.closePopup();
    });
  }

  _removeEventListeners() {
    super._removeEventListeners();

    this._popupButton.removeEventListener('click', this._handleButtonFunction);
  }
}

export default PopupWithSubmitButton;
