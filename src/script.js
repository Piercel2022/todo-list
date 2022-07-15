import './style.css';

const completedStatus = (item, taskList) => {
  item.completed = !item.completed;
  localStorage.setItem('taskList', JSON.stringify(taskList));
};

export default completedStatus;