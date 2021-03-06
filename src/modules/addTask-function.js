import clearAllCompleted from './clearAll-function.js';
import { getTasks, addNewStorage } from './localStorage-functions.js';
import editFunction from './editFunction.js';

let tasksArray = [];

const removeTask = (removeButton, task) => {
  removeButton.parentElement.remove();
  tasksArray = getTasks();
  tasksArray.splice(task.index - 1, 1);
  tasksArray.forEach((task, index) => {
    task.index = index + 1;
  });
  addNewStorage(tasksArray);
};

const addTaskScreen = (task) => {
  const tasksList = document.getElementById('list');
  const clearAll = document.querySelector('.clear');
  const taskLine = document.createElement('div');
  taskLine.classList.add('line');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('check');
  const description = document.createElement('h3');
  description.classList.add('description');
  const options = document.createElement('span');
  const removeButton = document.createElement('span');
  removeButton.classList.add('delete');
  options.classList.add('options');

  description.innerHTML = task.description;
  options.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
  removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  tasksList.appendChild(taskLine);
  taskLine.append(checkBox, description, options, removeButton);

  taskLine.addEventListener('click', () => {
    options.classList.add('active');
    removeButton.classList.add('active');
    taskLine.classList.add('active');

    const editField = document.createElement('input');
    editField.classList.add('edit-input');
    editField.value = description.textContent;
    taskLine.replaceChild(editField, description);

    editField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        editFunction(task, taskLine, editField, description);

        taskLine.classList.remove('active');
        options.classList.remove('active');
        removeButton.classList.remove('active');
      }
    });

    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        tasksArray = getTasks();
        tasksArray[task.index - 1].completed = true;
        addNewStorage(tasksArray);
      } else {
        tasksArray = getTasks();
        tasksArray[task.index - 1].completed = false;
        addNewStorage(tasksArray);
      }
    });

    removeButton.addEventListener('click', () => {
      removeTask(removeButton, task);
    });
  });

  clearAll.addEventListener('click', () => {
    clearAllCompleted();
    if (checkBox.checked) {
      checkBox.parentElement.remove();
    }
  });
};

export default addTaskScreen;