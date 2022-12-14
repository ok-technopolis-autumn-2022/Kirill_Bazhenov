import { TaskListView } from "../view/TaskListView";
import { ButtonsView } from "../view/ButtonsView";
import { FormView } from "../view/FormView";

export class AppController {

  /**
   * @type {ButtonsView}
   */
   #buttons;

  /**
   * @type {FormView}
   */
  #form;

  #listTask

  constructor() {
    this.#listTask = new TaskListView();
    this.#buttons = new ButtonsView({taskListView: this.#listTask});
    this.#form = new FormView({taskListView: this.#listTask});
  }

}