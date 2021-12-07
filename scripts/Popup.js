class Popup {
  constructor(popupSelector, classToOpenPopup, closeButtonSelector, popupStartGameButtonSelector, handleButtonFunction) {
    this._popup = document.querySelector(popupSelector);
    this._classToOpenPopup = classToOpenPopup;
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._popupButton = this._popup.querySelector(popupStartGameButtonSelector);
    this._handleButtonFunction = handleButtonFunction;
  }

  openPopup() {
    this._popup.classList.add(this._classToOpenPopup);
    this.setEventListeners();
  }

  closePopup() {
    this._popup.classList.remove(this._classToOpenPopup);
    this._removeEventListeners();
  }

  _closePopupByPressEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _closePopupByClickOnOverlay(evt) {
    if (evt.target === this._popup) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.closePopup();
    });

    document.addEventListener('keydown', (evt) => {
      this._closePopupByPressEsc(evt);
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._closePopupByClickOnOverlay(evt);
    });

    if (this._handleButtonFunction) {
      this._popupButton.addEventListener('click', () => {
        this._handleButtonFunction();
        this.closePopup();
      });
    }
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', () => {
      this.closePopup();
    });

    document.removeEventListener('keydown', (evt) => {
      this._closePopupByPressEsc(evt);
    });

    this._popup.removeEventListener('mousedown', (evt) => {
      this._closePopupByClickOnOverlay(evt);
    });

    this._popupButton.removeEventListener('click', this._handleButtonFunction);
  }
}

export default Popup;
