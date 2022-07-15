// eslint-disable-next-line import/no-cycle
import displayTasks from './index';

const addTask = document.getElementById('task');
const form = document.getElementById('form');

const addTaskList = (taskList) => {
  const description = addTask.value;
  const completed = false;
  if (description === '') {
    addTask.setAttribute('required', '');
    addTask.style.border = 'thin solid red';
  } else {
    const id = taskList.length + 1;
    const task = { description, completed, id };
    taskList.push(task);
    addTask.style.border = 'thin solid black';
    localStorage.setItem('taskList', JSON.stringify(taskList));
    displayTasks();
  }
  form.reset();
};

export default addTaskList;