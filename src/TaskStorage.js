import { Task } from "./Task";

export class TaskStorage {

  /**
   *
   * @type {Task[]}
   */
  tasks = []

  addTask(name) {
    const task = new Task(name);
    this.tasks.push(task);
    return task;
  }

  makeFilteredOutput(target) {
    this.tasks.forEach(function (task) {
      const checkbox = task.getCheckboxState();
      const forValue = target.getAttribute('for');
      if (forValue === 'button_all_tasks' || (forValue === 'button_active_tasks' && !checkbox.checked)
        || (forValue === 'button_completed_tasks' && checkbox.checked)) {
        task.doVisible();
      } else {
        task.doNotVisible();
      }
    });
  }

  deleteTask(event) {
    let button = event.target;
    if (button.className === 'task-item_delete') {
      let li = button.parentElement;
      let index = this.tasks.findIndex(el => (el.getId() === li.id));
      this.tasks.splice(index, 1);
      li.remove();
    }
  }

  selectAllTasks() {
    this.tasks.forEach(function (task) {
      if (!task.getCheckboxState().checked) {
        task.getLabel().click();
      }
    });
  }

  deleteCompletedTasks() {
    const inxs = [];
    this.tasks.forEach(function (task, index) {
      if (task.getCheckboxState().checked) {
        task.getLiElement().remove();
        inxs.push(index);
      }
    });
    let i = this.tasks.length;
    while(i--) {
      if (inxs.indexOf(i) !== -1) {
        this.tasks.splice(i, 1);
      }
    }
  }

  getUncheckedItems(){
    let count = 0;
    this.tasks.forEach(function (task) {
      if (!task.getCheckboxState().checked && task.isVisible()) {
        count++;
      }
    });
    return count;
  }
}