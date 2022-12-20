import { Observer } from "./Observer";

export class DeleteObserver extends Observer {
  update(taskStorage, event) {
    taskStorage.deleteTask(event);
  }
}