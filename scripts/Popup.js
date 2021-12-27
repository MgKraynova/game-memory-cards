class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
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
  }
}

export default Popup;
