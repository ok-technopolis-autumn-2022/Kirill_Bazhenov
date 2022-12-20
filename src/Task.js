export class Task {
  /**
   * @type {HTMLLIElement}
   */
  #task

  #visibility

  constructor(name) {
    this.#task = this.#createLi(name);
    this.#visibility = true;
  }

  getId() {
    return this.#task.id;
  }

  getLiElement() {
    return this.#task;
  }

  isVisible() {
    return this.#visibility;
  }

  doVisible() {
    this.#task.classList.remove('none_display_task');
    this.#visibility = true;
  }

  doNotVisible() {
    this.#task.classList.add('none_display_task');
    this.#visibility = false;
  }

  getLabel() {
    return this.#task.querySelector('label');
  }

  getInput() {
    return this.#task.querySelector('input');
  }

  /**
   * @return {HTMLInputElement}
   */
  getCheckboxState() {
    return this.getLabel().querySelector('[class="task_item-checkbox"]');
  }

  #createLi(name) {
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
}