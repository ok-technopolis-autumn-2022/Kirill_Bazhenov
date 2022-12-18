export class Observable {
  /**
   * @type {Observer[]}
   */
  actions = []

  /**
   * @param {Observer} sub
   */
  subscribe(sub) {
    this.actions.push(sub);
  }

  /**
   * @param {Observer} sub
   */
  unsubscribe(sub) {
    this.actions = this.actions.filter(s => s !== sub);
  }

  notify(taskStorage) {
    this.actions.forEach(s => s.update(taskStorage));
  }

}