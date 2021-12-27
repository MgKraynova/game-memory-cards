class SectionForCards {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cardsData) {
    cardsData.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default SectionForCards;


