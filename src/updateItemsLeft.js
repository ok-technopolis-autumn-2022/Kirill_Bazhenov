
const itemsCount = document.querySelector('.todo_app_task-count p');

function getCorrectDeclination(number) {
  return (number === 1) ? 'item' : 'items';
}

export function updateItemsLeft(number) {
  itemsCount.textContent = `${number} ${getCorrectDeclination(number)} left`;
}