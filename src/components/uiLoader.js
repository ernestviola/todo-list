import { projectList, createProject, deleteProject } from './projectLogic';
import 'material-symbols';

let activeProject = projectList[0] || null;
let activeTask = null;

const root = document.querySelector('#root');
let projectListEl;
let taskListEl;

function setActiveProject(project) {
  activeProject = project;
  render();
}

function render() {
  renderProjectList();
  renderTaskList();
}

function handleProjectClick(e) {
  const projectEl = e.target.closest('.project');
  if (!projectEl) return;

  const index = [...projectListEl.children].indexOf(projectEl);
  activeProject = projectList[index];
  renderTaskList();
}

function handleProjectDoubleClick(e) {
  const projectEl = e.target.closest('.project');
  if (!projectEl) return;

  const projectName = projectEl.querySelector('.project__name');

  e.preventDefault()
  projectName.contentEditable = true;
  projectName.focus();
  const range = document.createRange();
  range.selectNodeContents(projectName);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function handleProjectNameEdit(e, project) {
  if (e.type === 'keydown' && e.key !== 'Enter') return;
  e.preventDefault();

  const projectName = e.target;

  if (projectName.innerText.trim() === '') {
    projectName.innerText = 'untitled';
  }

  project.updateProject(projectName.innerText);
  projectName.contentEditable = false;
}

function handleProjectDelete(e, project) {
  e.stopPropagation();

  if (project.tasks.length > 0 &&
    !window.confirm('This project still has tasks. Are you sure you want to delete?')) {
    return;
  }

  deleteProject(project.uuid);

  if (projectList.length === 0) {
    setActiveProject(null);
  } else if (activeProject === project) {
    setActiveProject(projectList[0]);
  } else {
    render();
  }
}

function createProjectElement(project) {
  const isActive = project === activeProject;

  const projectEl = document.createElement('div');
  projectEl.className = `project ${isActive ? 'active' : ''}`;

  const projectName = document.createElement('span');
  projectName.innerText = project.name;
  projectName.className = 'project__name'

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('material-symbols-outlined', 'button__background__transparent')
  deleteBtn.innerText = 'close';

  projectEl.appendChild(projectName);
  projectEl.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', (e) => handleProjectDelete(e, project));
  projectName.addEventListener('keydown', (e) => handleProjectNameEdit(e, project));
  projectName.addEventListener('focusout', (e) => handleProjectNameEdit(e, project));

  return projectEl;
}

function renderProjectList() {
  projectListEl.replaceChildren();
  projectList.forEach(project => {
    projectListEl.appendChild(createProjectElement(project));
  })
}

function handleNewProject() {
  const newProject = createProject();
  setActiveProject(newProject);
}


function createTaskElement(task) {
  const taskEl = document.createElement('div');
  taskEl.className = 'task';

  const taskTitle = document.createElement('span')
  taskTitle.className = 'task__title';
  taskTitle.innerText = task.title;

  const taskDescription = document.createElement('span')
  taskDescription.className = 'task__description';
  taskDescription.innerText = task.description;

  const taskDueDate = document.createElement('span')
  taskDueDate.className = 'task__due__date';
  taskDueDate.innerText = new Date(task.dueDate).toLocaleDateString();

  const taskPriority = document.createElement('span')
  taskPriority.className = 'task__priority';
  taskPriority.innerText = task.priority;

  const taskInfoContainer = document.createElement('div');
  taskInfoContainer.className = 'task__info'

  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const completeBtn = document.createElement('button');

  editBtn.className = 'task__edit material-symbols-outlined';
  deleteBtn.className = 'task__delete material-symbols-outlined';
  completeBtn.className = 'task__complete material-symbols-outlined';

  editBtn.innerText = 'edit'
  deleteBtn.innerText = 'delete';
  completeBtn.innerText = task.complete ? "check_box" : 'check_box_outline_blank';

  completeBtn.addEventListener('click', (e) => handleTaskComplete(e, task));
  editBtn.addEventListener('click', (e) => handleTaskEdit(e, task));
  deleteBtn.addEventListener('click', (e) => handleTaskDelete(e, task));

  taskEl.appendChild(completeBtn);
  taskEl.appendChild(taskInfoContainer)
  taskInfoContainer.appendChild(taskTitle);
  taskInfoContainer.appendChild(taskDescription);
  taskInfoContainer.appendChild(taskDueDate);
  taskInfoContainer.appendChild(taskPriority);
  taskEl.appendChild(editBtn);
  taskEl.appendChild(deleteBtn);

  return taskEl;
}

function renderTaskList() {
  taskListEl.replaceChildren();

  if (!activeProject) return;

  activeProject.tasks.forEach(task => {
    taskListEl.appendChild(createTaskElement(task));
  })
}

function clearTaskForm() {
  const form = document.getElementById('form');
  form.reset();
}

function openTaskModal() {
  // if there is an activeTask then load that into the form
  if (activeTask) {
    document.getElementById('title').value = activeTask.title;
    document.getElementById('description').value = activeTask.description;
    document.getElementById('dueDate').value = new Date(activeTask.dueDate).toISOString().substring(0, 10);
    document.getElementById('priority').value = activeTask.priority;
  }

  const modal = document.querySelector('#form__modal');
  modal.showModal();
}

function closeTaskModal(e) {
  e.preventDefault();
  const modal = document.querySelector('#form__modal');
  clearTaskForm();
  activeTask = null;
  modal.close();
}

function handleTaskDelete(e, task) {
  e.preventDefault();
  activeProject.deleteTask(task);
  renderTaskList();
}

function handleTaskEdit(e, task) {
  e.preventDefault();
  activeTask = task;
  openTaskModal();
}

function handleTaskComplete(e, task) {
  e.preventDefault();
  const toggleComplete = e.target.innerText !== 'check_box' ?
    'check_box' : 'check_box_outline_blank';
  task.updateTask(null, null, null, null, toggleComplete === 'check_box');
  console.log(task)
  e.target.innerText = toggleComplete;
}

function handleTaskSave(e) {
  if (!activeTask) {
    // create a new task add it to the active project and set to task
    activeTask = activeProject.createTask();
  }

  const form = document.getElementById('form');
  const formData = new FormData(form);

  activeTask.updateTask(
    formData.get('title'),
    formData.get('description'),
    formData.get('dueDate'),
    formData.get('priority')
  );
  closeTaskModal(e);
  renderTaskList();
  activeTask = null;
}

function initProjectListSection() {
  const newProjectBtn = document.querySelector('.new__project');
  const projectListEl = document.querySelector('.project__list')

  newProjectBtn.addEventListener('click', handleNewProject);
  projectListEl.addEventListener('click', handleProjectClick);
  projectListEl.addEventListener('dblclick', handleProjectDoubleClick);
  return projectListEl;
}

function initTaskListSection() {
  const newTaskBtn = document.querySelector('.new__task');
  const taskListEl = document.querySelector('.task__list');
  newTaskBtn.addEventListener('click', openTaskModal);
  return taskListEl;
}

function initNewTaskModal() {
  const dialog = document.getElementById('form__modal');
  const form = document.getElementById('form')
  const taskCancelBtn = document.querySelector('.form__cancel');


  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      clearTaskForm();
    }
  });

  form.addEventListener('submit', (e) => {
    handleTaskSave(e);
  })

  taskCancelBtn.addEventListener('click', (e) => closeTaskModal(e));
}

projectListEl = initProjectListSection();
taskListEl = initTaskListSection();
initNewTaskModal();

export { render, setActiveProject };