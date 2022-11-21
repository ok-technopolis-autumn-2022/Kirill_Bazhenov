import {updateItemsLeft} from "./updateItemsLeft";
let tasks = [];

export let exportTasks = {arr:tasks};

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

  const div = document.createElement('div');
  div.className = 'custom_circle_button';

  const span = document.createElement('span');
  span.className = 'item_name';
  span.textContent = name.desc;

  label.append(input, div, span);


  const buttonDelete = document.createElement('button');
  buttonDelete.className = 'task-item_delete';
  buttonDelete.ariaRoleDescription = 'button';

  const deleteTask = () => {
    buttonDelete.removeEventListener('click', deleteTask);
    let index = tasks.map(el => el.id).indexOf(name.id);
    tasks.splice(index, 1);
    li.remove();
    updateItemsLeft(tasks.length);
  };

  buttonDelete.addEventListener('click', deleteTask);


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


