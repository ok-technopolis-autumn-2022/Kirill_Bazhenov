
const itemsCount = document.querySelector('.todo_app_task-count');

export function updateItemsLeft(number) {
  const words = itemsCount.textContent.trim().split(' ');
  itemsCount.textContent = String(number) + ' ' + words[1] + ' ' + words[2];
}