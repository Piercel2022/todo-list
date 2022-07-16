import './style.css';
import completedStatus from './script.js';
// eslint-disable-next-line import/no-cycle
import addTaskList from './add-items.js';

const allTasks = document.getElementById('all-tasks');
const insert = document.getElementById('enter-task');
const removeAll = document.getElementById('all-completed');

// eslint-disable-next-line prefer-const
let taskList = [];

const getData = () => {
  if (localStorage.getItem('taskList') !== null) {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }
};

const displayTasks = () => {
  if (localStorage.getItem('taskList') !== null) {
    taskList = JSON.parse(localStorage.getItem('taskList'));

    allTasks.innerHTML = '';
    for (let i = 0; i < taskList.length; i += 1) {
      const each = taskList[i];

      const eachTask = document.createElement('div');
      eachTask.className = 'eachTask';

      const list = document.createElement('div');
      list.className = 'group-list';

      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('class', 'check-box');
      input.id = each.id;
      input.checked = each.completed;
      // eslint-disable-next-line no-loop-func
      input.addEventListener('change', () => {
        completedStatus(each, taskList);
      });
      list.appendChild(input);
      eachTask.appendChild(list);

      const inputLabel = document.createElement('input');
      inputLabel.value = each.description;
      inputLabel.setAttribute('type', 'text');
      inputLabel.className = 'form-label';
      inputLabel.contentEditable = true;
      list.appendChild(inputLabel);
      eachTask.appendChild(list);
      const button = document.createElement('i');
      button.classList.add('fas', 'fa-ellipsis-v');
      eachTask.appendChild(button);
      const trash = document.createElement('div');
      trash.innerHTML = '<i class="fas fa-trash-alt"></i>';
      trash.setAttribute('class', 'bin');
      trash.style.display = 'none';
      eachTask.appendChild(trash);

      // eslint-disable-next-line no-loop-func
      inputLabel.addEventListener('blur', () => {
        inputLabel.style.background = '#ffffff';
        eachTask.style.background = '#ffffff';
        button.style.display = 'inline';
        trash.style.display = 'none';
        const newValue = inputLabel.value;
        // eslint-disable-next-line no-use-before-define
        edit(newValue, taskList, i);
      });

      inputLabel.addEventListener('focus', () => {
        inputLabel.style.background = '#90EE90';
        eachTask.style.background = '#90EE90';
        button.style.display = 'none';
        trash.style.display = 'inline';
      });
      // eslint-disable-next-line no-loop-func
      trash.addEventListener('mousedown', () => {
        // eslint-disable-next-line no-use-before-define
        removeTask(taskList, i);
      });
      allTasks.appendChild(eachTask);
    }
  } else {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    getData();
  }
};

const removeTask = (taskList, index) => {
  taskList.splice(index, 1);
  for (let j = 0; j < taskList.length; j += 1) {
    taskList[j].id = j + 1;
  }
  localStorage.setItem('taskList', JSON.stringify(taskList));
  displayTasks();
};

removeAll.addEventListener('click', () => {
  taskList = taskList.filter((task) => !task.completed);
  let reset = 0;
  taskList.forEach((task) => {
    reset += 1;
    task.id = reset;
  });
  localStorage.setItem('taskList', JSON.stringify(taskList));
  displayTasks();
});

insert.addEventListener('click', (e, taskList) => {
  if (localStorage.getItem('taskList') !== null) {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }
  e.preventDefault();
  addTaskList(taskList);
});
const edit = (newValue, taskList, i) => {
  taskList[i].description = newValue;
  localStorage.setItem('taskList', JSON.stringify(taskList));
};

export default displayTasks;

window.onload = displayTasks();