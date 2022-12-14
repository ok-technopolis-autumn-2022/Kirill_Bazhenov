import { AbstractView } from "./AbstractView";
import { TaskView } from "./TaskView";


export class TaskListView extends AbstractView {
  /**
   * @type {TaskView[]}
   */
  #tasks

  /**
   * @type {HTMLUListElement}
   */
  #ul

  constructor(props) {
    super(props);
    this.#ul = this.#createUl();
    this.#tasks = [];
  }

  /**
   * @param  name (id : string | number, desc: string)
   */
  add(name) {
    const task = new TaskView({name: name, getUncheckedItems: this.getUncheckedItems});
    this.#ul.appendChild(task.getLiElement());
    this.#tasks.push(task);
    this._checkItem(this.getUncheckedItems);
  }

  getUncheckedItems = () => {
    let count = 0;
    this.#tasks.forEach(function (task) {
      if (!task.getCheckboxState().checked) {
        count++;
      }
    });
    return count;
  }

  /**
   *
   * @return {TaskView[]}
   */
  getTasks() {
    return this.#tasks;
  }


  /**
   * @return {HTMLUListElement}
   */
  #createUl() {
    const ul = document.querySelector('.todo-app_task-list');
    ul.addEventListener('click', this.#deleteTask);
  }

  #deleteTask(event) {
    let button = event.target;
    if (button.className === 'task-item_delete') {
      let li = button.parentElement;
      let index = this.#tasks.findIndex(el => (el.getId() === li.id));
      this.#tasks.splice(index, 1);
      li.remove();
      this._checkItem(this.getUncheckedItems());
    }
  }

}