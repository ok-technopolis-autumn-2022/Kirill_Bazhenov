import { Observable } from "./Observable";

export class StateObservable extends Observable {
  notify(taskStorage, event) {
    this.actions.forEach(s => s.update(taskStorage, event));
  }
}