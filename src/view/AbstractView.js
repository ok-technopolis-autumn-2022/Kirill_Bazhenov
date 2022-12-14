export class AbstractView {

  _props;

  /**
   * @type {{HTMLElement}}
   */
  #itemsCount

  constructor(props) {
    this._props = props;
    this.#itemsCount = document.querySelector('.todo_app_task-count p');
  }

  get props() {
    return this._props;
  }

  /**
   *
   * @param getUncheckedItem: () => Number
   */
  _checkItem(getUncheckedItem) {
    this.#updateItemsLeft(getUncheckedItem);
  }

  #updateItemsLeft(number) {
    this.#itemsCount.textContent = `${number} ${this.#getCorrectDeclination(number)} left`;
  }

  #getCorrectDeclination(number) {
    return (number === 1) ? 'item' : 'items';
  }
}