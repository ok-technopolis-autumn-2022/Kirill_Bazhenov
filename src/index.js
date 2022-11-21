import {createLi, exportTasks} from "./createLi";
import {updateItemsLeft} from "./updateItemsLeft";

const ul = document.querySelector('.todo-app_task-list');
const form = document.querySelector('.needs_field-create_new');
const selectButton = document.querySelector('.button_select_all_tasks');
const removeButton = document.querySelector('[class="task-items_clear"]');


document.querySelector('.tasks-button_group').onclick = function (event) {
  let target = event.target;
  if (target.tagName !== 'LABEL') {
    return;
  }
  buttonAction(target);
}

function buttonAction(target) {
  let itemCount = exportTasks.arr.length;
  exportTasks.arr.forEach(function (task) {
    const li = ul.querySelector(`[id="${task.id}"]`);
    const label = li.querySelector('label');
    const checkbox = label.querySelector('[class="task_item-checkbox"]');
    const forValue = target.getAttribute('for');
    if (forValue === 'button_all_tasks' || (forValue === 'button_active_tasks' && !checkbox.checked)
        || (forValue === 'button_completed_tasks' && checkbox.checked)) {
      li.classList.remove('none_display_task');
    } else {
      li.classList.add('none_display_task');
      itemCount--;
    }
  });
  updateItemsLeft(itemCount);
}

function addTask(e) {
  e.preventDefault();
  const task = createTask(this.description.value);
  ul.appendChild(createLi(task));
  exportTasks.arr.push(task);
  updateItemsLeft(exportTasks.arr.length);
  this.reset();
}

function createTask(desc) {
  return {
    id: Date.now(),
    desc: desc,
  };
}

form.addEventListener('submit', addTask);
selectButton.addEventListener('click', selectAllTasks);
removeButton.addEventListener('click', removeAction);

function selectAllTasks() {
  exportTasks.arr.forEach(function (task) {
    const li = ul.querySelector(`[id="${task.id}"]`);
    const label = li.querySelector('label');
    const checkbox = label.querySelector('[class="task_item-checkbox"]');
    if (!checkbox.checked) {
      li.querySelector('label').click();
    }
  });
}

function removeAction() {
  const inxs = [];
  exportTasks.arr.forEach(function (task, index) {
    const li = ul.querySelector(`[id="${task.id}"]`);
    const label = li.querySelector('label');
    const checkbox = label.querySelector('[class="task_item-checkbox"]');
    if (checkbox.checked) {
      li.remove();
      inxs.push(index);
    }
  });
  exportTasks.arr = exportTasks.arr.filter((value, inx) => inxs.indexOf(inx) === -1);
  updateItemsLeft(exportTasks.arr.length);
}
