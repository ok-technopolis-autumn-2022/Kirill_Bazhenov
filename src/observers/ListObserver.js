import { Observer } from "./Observer";

export class ListObserver extends Observer {

  update(taskStorage, event) {
    let target = event.target;
    if (target.className !== 'checkbox_label') {
      return;
    }
    taskStorage.makeFilteredOutput(target);
  }
}