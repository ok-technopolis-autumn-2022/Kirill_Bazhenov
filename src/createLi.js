import {updateItemsLeft} from "./updateItemsLeft";

const ul = document.querySelector('.todo-app_task-list');
let tasks = [];

export let exportTasks = {arr:tasks};

export function getUncheckedItems() {
  let count = 0;
  tasks.forEach(function (task) {
    const li = ul.querySelector(`[id="${task.id}"]`);
    const label = li.querySelector('label');
    const checkbox = label.querySelector('[class="task_item-checkbox"]');
    if (!checkbox.checked) {
      count++;
    }
  });
  return count;
}

function deleteTask(event) {
  let button = event.target;
  if (button.className === 'task-item_delete') {
    let li = button.parentElement;
    let index = tasks.findIndex(el => (el.id === Number(li.id)));
    tasks.splice(index, 1);
    li.remove();
    updateItemsLeft(getUncheckedItems());
  }
}

ul.addEventListener('click', deleteTask);

/**
 *
 * @param name {{id : string | number, desc: string}}
 * @returns {string}
 */

export function createLi(name) {
  const li = document.createElement('li');
  li.id = name.id;
  li.className = 'todo-app_task-item';

  const label = document.createElement('label');

  const input = document.createElement('input');
  input.id = name.id;
  input.type = 'checkbox';
  input.className = 'task_item-checkbox';
  input.ariaLabel = `Completed task: ${name.desc}`;

  function checkItem() {
    updateItemsLeft(getUncheckedItems());
  }

  input.addEventListener('click', checkItem);

  const div = document.createElement('div');
  div.className = 'custom_circle_button';

  const span = document.createElement('span');
  span.className = 'item_name';
  span.textContent = name.desc;

  label.append(input, div, span);


  const buttonDelete = document.createElement('button');
  buttonDelete.className = 'task-item_delete';
  buttonDelete.ariaRoleDescription = 'button';

  const divEdit = document.createElement('div');
  divEdit.className = 'task-item_edit';
  divEdit.hidden = true;

  const hiddenInput = document.createElement('input');
  hiddenInput.className = 'task-item_input';
  hiddenInput.type = 'text';
  hiddenInput.value = `${name.desc}`;
  hiddenInput.ariaLabel = `Edit task: ${name.desc}`;
  divEdit.append(hiddenInput);

  li.append(label, buttonDelete, divEdit);
  return li;
}


