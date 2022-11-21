const form = document.querySelector('.needs_field-create_new');
const ul = document.querySelector('.todo-app_task-list');
const selectButton = document.querySelector('.button_select_all_tasks');
const allButton = document.querySelector(`[id="button_all_tasks"]`);
const activeButton = document.querySelector(`[id="button_active_tasks"]`);
const completedButton = document.querySelector(`[id="button_completed_tasks"]`);
const removeButton = document.querySelector('[class="task-items_clear"]');


let tasks = [];

function addTask(e) {
    e.preventDefault();
    const task = createTask(this.description.value);
    ul.appendChild(createLi(task));
    tasks.push(task);
    this.reset();
}

form.addEventListener('submit', addTask);
selectButton.addEventListener('click', selectAllTasks);
allButton.addEventListener('click', allAction);
activeButton.addEventListener('click', activeAction);
completedButton.addEventListener('click',completedAction);
removeButton.addEventListener('click', removeAction);

function selectAllTasks() {
    tasks.forEach(function(task){
        let li = ul.querySelector(`[id="${task.id}"]`);
        let label = li.querySelector('label');
        let checkbox = label.querySelector('[class="task_item-checkbox"]');
        if (!checkbox.checked) {
            li.querySelector('label').click();
        }
    });
}

function allAction() {
    tasks.forEach(function(task){
        let li = ul.querySelector(`[id="${task.id}"]`);
        li.style.display = '';
    });
}

function activeAction() {
    tasks.forEach(function(task){
        let li = ul.querySelector(`[id="${task.id}"]`);
        let label = li.querySelector('label');
        let checkbox = label.querySelector('[class="task_item-checkbox"]');
        if (checkbox.checked) {
            li.style.display = 'none';
        } else {
            li.style.display = '';
        }
    });
}

function completedAction() {
    tasks.forEach(function(task){
        let li = ul.querySelector(`[id="${task.id}"]`);
        let label = li.querySelector('label');
        let checkbox = label.querySelector('[class="task_item-checkbox"]');
        if (checkbox.checked) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });
}

function removeAction() {
    let inxs = [];
    tasks.forEach(function(task,index){
        let li = ul.querySelector(`[id="${task.id}"]`);
        let label = li.querySelector('label');
        let checkbox = label.querySelector('[class="task_item-checkbox"]');
        if (checkbox.checked) {
            li.remove();
            inxs.push(index);
        }
    });
    tasks = tasks.filter((value, inx) => inxs.indexOf(inx) === -1);
}

function createTask(desc) {
    return {
        id: Date.now(),
        desc: desc
    }
}

/**
 *
 * @param name {{id : string | number, desc: string}}
 * @returns {string}
 */

function createLi(name) {
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
    buttonDelete.ariaRoleDescription = 'button'

    const deleteTask = () => {
        buttonDelete.removeEventListener('click', deleteTask);
        li.remove();
    }

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