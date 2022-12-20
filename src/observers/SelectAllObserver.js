import { Observer } from "./Observer";

export class SelectAllObserver extends Observer {
  update(taskStorage) {
    taskStorage.selectAllTasks();
  }
}