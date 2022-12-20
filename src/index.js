import { TaskStorage } from "./TaskStorage";
import { StateObservable } from "./observables/StateObservable";
import { ItemsObserver } from "./observers/ItemsObserver";
import { ListObserver } from "./observers/ListObserver";
import { RemoveTaskObservable } from "./observables/RemoveTaskObservable";
import { DeleteObserver } from "./observers/DeleteObserver";
import { Observable } from "./observables/Observable";
import { SelectAllObserver } from "./observers/SelectAllObserver";
import { RemoveCompletedObserver } from "./observers/RemoveCompletedObserver";

const form = document.querySelector('.needs_field-create_new');
const ul = document.querySelector('.todo-app_task-list');
const taskButtonGroup = document.querySelector('.tasks-button_group');
const selectAllButton = document.querySelector('.button_select_all_tasks');
const removeButton = document.querySelector('[class="task-items_clear"]')

const itemObserver = new ItemsObserver();

const taskStorage = new TaskStorage();
form.addEventListener('submit', addTask);

const state = new StateObservable();
state.subscribe(itemObserver);
state.subscribe(new ListObserver());

const removeAction = new RemoveTaskObservable();
removeAction.subscribe(new DeleteObserver());
removeAction.subscribe(itemObserver);

const selectAll = new Observable();
selectAll.subscribe(new SelectAllObserver());
selectAll.subscribe(itemObserver);

const removeCompleted = new Observable();
removeCompleted.subscribe(new RemoveCompletedObserver());
removeCompleted.subscribe(itemObserver);

taskButtonGroup.addEventListener('click', (event) => state.notify(taskStorage, event));
ul.addEventListener('click', (event) => removeAction.notify(taskStorage, event));
selectAllButton.addEventListener('click', () => selectAll.notify(taskStorage));
removeButton.addEventListener('click', () => removeCompleted.notify(taskStorage));
function addTask(event){
  event.preventDefault();
  const task = taskStorage.addTask(createTask(this.description.value));
  ul.appendChild(task.getLiElement());
  task.getInput().addEventListener('click', (event) => state.notify(taskStorage, event));
  state.notify(taskStorage, event);
  this.reset();
}

function createTask(desc){
  return {
    id: Date.now(),
    desc: desc,
  };
}
