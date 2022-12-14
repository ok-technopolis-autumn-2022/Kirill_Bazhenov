import { AbstractView } from "./AbstractView";

export class ButtonsView extends AbstractView {

  /**
   * @param {HTMLElement}
   */
  #selectButton

  /**
   * @param {HTMLElement}
   */
  #removeButton

  /**
   * @param {HTMLElement}
   */
  #taskButtonGroup

  /**
   * @type {TaskListView}
   */
  #listView

  /**
   *
   * @param props {{
   *   taskListView: TaskListView
   * }}
   */
  constructor(props) {
    super(props);
    this.#listView = props.taskListView;
    this.#taskButtonGroup = this.#createTaskButtonGroup();
    this.#selectButton = this.#createSelectAllButton();
    this.#removeButton = this.#createRemoveButton();
  }

  #createTaskButtonGroup() {
    const taskButtonGroup = document.querySelector('.tasks-button_group');
    taskButtonGroup.addEventListener('click', this.#actionOnLabel)
    return taskButtonGroup;
  }

  #actionOnLabel(event) {
    let target = event.target;
    if (target.className !== 'checkbox_label') {
      return;
    }
    this.#buttonAction(target);
  }


  #buttonAction(target) {
    this.#listView.getTasks().forEach(function (task) {
      const checkbox = task.getCheckboxState();
      const forValue = target.getAttribute('for');
      if (forValue === 'button_all_tasks' || (forValue === 'button_active_tasks' && !checkbox.checked)
        || (forValue === 'button_completed_tasks' && checkbox.checked)) {
        task.doVisible();
      } else {
        task.doNotVisible();
      }
    });
    this._checkItem(this.#listView.getUncheckedItems());
  }

  #createSelectAllButton() {
    const selectAllButton = document.querySelector('.button_select_all_tasks');
    selectAllButton.addEventListener('click', this.#selectAllTasks);
    return selectAllButton;
  }

  #selectAllTasks() {
    this.#listView.getTasks().forEach(function (task) {
      if (!task.getCheckboxState().checked) {
        task.getLabel().click();
      }
    });
  }

  #createRemoveButton() {
    const removeButton = document.querySelector('[class="task-items_clear"]')
    removeButton.addEventListener('click', this.#removeAction);
    return removeButton;
  }


  #removeAction() {
    const inxs = [];
    const arr = this.#listView.getTasks();
    arr.forEach(function (task, index) {
      if (task.getCheckboxState().checked) {
        task.getLiElement().remove();
        inxs.push(index);
      }
    });
    let i = arr.length;
    while(i--) {
      if (inxs.indexOf(i) !== -1) {
        arr.splice(i, 1);
      }
    }
    this._checkItem(this.#listView.getUncheckedItems());
  }
}
