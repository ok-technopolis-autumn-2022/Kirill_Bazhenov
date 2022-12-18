import { Observable } from "./Observable";

export class RemoveTaskObservable extends Observable {

  notify(taskStorage, event) {
    this.actions.forEach(s => s.update(taskStorage, event));
  }

}