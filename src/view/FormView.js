import { AbstractView } from "./AbstractView";
import { TaskListView } from "./TaskListView";

export class FormView extends AbstractView {
  /**
   * @type {HTMLFormElement}
   */
  #form;

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
    this.#form = this.createForm();
    this.#listView = this.props.taskListView;
  }

  addTask(e) {
    e.preventDefault();
    const name = this.createTask(this.description.value);
    this.#listView.add(name);
    this.reset();
  }

  /**
   *
   * @return {HTMLFormElement}
   */
  createForm() {
    const form = document.querySelector('.needs_field-create_new');
    form.addEventListener('submit', this.addTask);
    return form;
  }

  createTask(desc) {
    return {
      id: Date.now(),
      desc: desc,
    };
  }

}