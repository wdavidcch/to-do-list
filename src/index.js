import './style.css';
// import tasksArray from './modules/module3.js';
import addTaskScreen from './modules/module2.js';
import Tasks from './modules/module3.js';

let tasksArray = [];

const enterNewTask = document.querySelector('.enter');

const getTasks = () => {
  if (localStorage.getItem('tasks') === null) {
    tasksArray = [];
  } else {
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasksArray;
};

const addTaskStorage = (task) => {
  tasksArray = getTasks();
  tasksArray.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
};

const displayTasks = () => {
  tasksArray = getTasks();
  tasksArray.forEach((task) => addTaskScreen(task));
};

enterNewTask.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    // eslint-disable-next-line no-unused-expressions
    e.preventDefault;
    const task = new Tasks(enterNewTask.value, false, tasksArray.length);
    addTaskStorage(task);
    addTaskScreen(task);
    enterNewTask.value = null;
  }
});

displayTasks();
