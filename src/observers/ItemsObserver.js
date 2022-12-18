import { Observer } from "./Observer";

export class ItemsObserver extends Observer {
  update(taskStorage) {
    this.updateItemsLeft(taskStorage.getUncheckedItems());
  }

  updateItemsLeft(number) {
    document.querySelector('.todo_app_task-count p').textContent = `${number} ${this.getCorrectDeclination(number)} left`;
  }

  getCorrectDeclination(number) {
    return (number === 1) ? 'item' : 'items';
  }
}