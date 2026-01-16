import { projectList, createProject, deleteProject } from './projectLogic';

let activeProject = projectList[0] || null;

const root = document.querySelector('#root');
let projectListContainer;
let taskList;

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

  const index = [...projectListContainer.children].indexOf(projectEl);
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
  deleteBtn.innerText = 'close';

  projectEl.appendChild(projectName);
  projectEl.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', (e) => handleProjectDelete(e, project));
  projectName.addEventListener('keydown', (e) => handleProjectNameEdit(e, project));
  projectName.addEventListener('focusout', (e) => handleProjectNameEdit(e, project));

  return projectEl;
}

function renderProjectList() {
  projectListContainer.replaceChildren();
  projectList.forEach(project => {
    projectListContainer.appendChild(createProjectElement(project));
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
  taskDueDate.innerText = task.dueDate;
  const taskPriority = document.createElement('span')
  taskPriority.className = 'task__priority';
  taskPriority.innerText = task.priority;

  taskEl.appendChild(taskTitle);
  taskEl.appendChild(taskDescription);
  taskEl.appendChild(taskDueDate);
  taskEl.appendChild(taskPriority);

  return taskEl;
}

function renderTaskList() {
  taskList.replaceChildren();

  if (!activeProject) return;

  activeProject.tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  })
}

function handleNewTask() {
  if (!activeProject) return;

  activeProject.createTask();
  renderTaskList();
}

function initProjectListSection() {
  const section = document.createElement('div');
  const sectionHeader = document.createElement('div');
  const sectionHeaderTitle = document.createElement('span');
  const newProjectBtn = document.createElement('button');
  const projectList = document.createElement('div');
  section.className = 'project__list__section';
  sectionHeader.className = 'project__list__header';
  sectionHeaderTitle.innerText = 'Projects';
  newProjectBtn.innerText = 'New +';
  projectList.className = 'project__list';


  sectionHeader.appendChild(sectionHeaderTitle);
  sectionHeader.appendChild(newProjectBtn);
  section.appendChild(sectionHeader);
  section.appendChild(projectList);
  root.appendChild(section);

  newProjectBtn.addEventListener('click', handleNewProject);
  projectList.addEventListener('click', handleProjectClick);
  projectList.addEventListener('dblclick', handleProjectDoubleClick);
  return projectList;
}

function initTaskListSection() {
  const section = document.createElement('div');
  const sectionHeader = document.createElement('div');
  const headerTitle = document.createElement('span');
  const newTaskBtn = document.createElement('button');
  const taskList = document.createElement('div');

  section.className = 'task__list__section'
  sectionHeader.className = 'task__list__header'
  taskList.className = 'task__list';
  headerTitle.innerText = 'Tasks'
  newTaskBtn.innerText = '+';

  section.appendChild(sectionHeader);
  section.appendChild(taskList);
  sectionHeader.appendChild(headerTitle);
  sectionHeader.appendChild(newTaskBtn);
  root.appendChild(section);

  newTaskBtn.addEventListener('click', handleNewTask);
  return taskList;
}

projectListContainer = initProjectListSection();
taskList = initTaskListSection();


export { render, setActiveProject };