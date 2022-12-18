import { Observer } from "./Observer";

export class RemoveCompletedObserver extends Observer {
  update(taskStorage) {
    taskStorage.deleteCompletedTasks();
  }
}