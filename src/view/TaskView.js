import { AbstractView } from "./AbstractView";


export class TaskView extends AbstractView {

  /**
   * @type {HTMLLIElement}
   */
  #task

  /**
   *
   * @param props {{
   *   name (id : string | number, desc: string),
   *   getUncheckedItems: () => Number
   * }}
   */
  constructor(props) {
    super(props);
    this.#task = this.#createLi();
  }

  getId() {
    return this.#task.id;
  }

  getLiElement() {
    return this.#task;
  }

  doVisible() {
    this.#task.classList.remove('none_display_task');
  }

  doNotVisible() {
    this.#task.classList.add('none_display_task');
  }

  getLabel() {
    return this.#task.querySelector('label');
  }

  /**
   * @return {HTMLInputElement}
   */
  getCheckboxState() {
    return this.getLabel().querySelector('[class="task_item-checkbox"]');
  }
  /**
   *
   * @return {HTMLLIElement}
   */
  #createLi() {
    const {name, getUncheckedItems} = this._props;
    const li = document.createElement('li');
    li.id = name.id;
    li.className = 'todo-app_task-item';

    const label = document.createElement('label');

    const input = document.createElement('input');
    input.id = name.id;
    input.type = 'checkbox';
    input.className = 'task_item-checkbox';
    input.ariaLabel = `Completed task: ${name.desc}`;
    input.addEventListener('click', getUncheckedItems);

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