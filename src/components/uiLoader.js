import { projectList, createProject } from './projectLogic';


function populateProject(project) {
  const projectContainer = document.createElement('div');
  const projectName = document.createElement('span');
  projectName.innerText = project.name;
  projectContainer.appendChild(projectName);
  projectContainer.addEventListener('click', () => {
    activeProject = project;
    populateToDoListUI(project);
  })

  projectName.addEventListener('click', (e) => {
    e.preventDefault();
    projectName.contentEditable = true;
  })

  projectName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (projectName.innerText == '') {
        projectName.innerText = 'untitled';
      }
      project.updateProject(projectName.innerText);
      projectName.contentEditable = false;
    }
  })

  projectContainer.addEventListener('focusout', (e) => {
    e.preventDefault()
    if (projectName.innerText == '') {
      projectName.innerText = 'untitled';
    }
    project.updateProject(projectName.innerText);
    projectName.contentEditable = false;
  })

  return projectContainer;
}

function populateProjectListUI(projectList) {
  projectListContainer.replaceChildren();
  for (let i = 0; i < projectList.length; i++) {
    projectListContainer.appendChild(
      populateProject(projectList[i])
    );
  }
}

function populateToDoListUI(project) {
  todoList.replaceChildren();
  for (let i = 0; i < project.tasks.length; i++) {
    todoList.append(
      populateTask(project.tasks[i])
    );
  }
}

function populateTask(task) {

  const taskContainer = document.createElement('div');
  taskContainer.className = 'task';
  const title = document.createElement('span');
  title.className = 'task__title'
  const description = document.createElement('span');
  description.className = 'task__description';
  const dueDate = document.createElement('span');
  dueDate.className = 'task__due__date'
  const priority = document.createElement('priority');
  priority.className = 'task__priority';

  title.innerText = task.title;
  description.innerText = task.description;
  dueDate.innerText = task.dueDate;
  priority.innerText = task.priority;

  taskContainer.appendChild(title);
  taskContainer.appendChild(description);
  taskContainer.appendChild(dueDate);
  taskContainer.appendChild(priority);

  return taskContainer;

}

function createProjectAndAddToList() {
  createProject();
  populateProjectListUI(projectList);
}

function createTaskAndAddToProject() {
  activeProject.createTask();
  populateToDoListUI(activeProject);
}

function initProjectListSection() {
  const projectListSection = document.createElement('div');
  const projectListHeader = document.createElement('div');
  const projectListHeaderTitle = document.createElement('span');
  const newProjectButton = document.createElement('button');
  newProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    createProjectAndAddToList();
  })
  const projectListContainer = document.createElement('div');
  projectListSection.className = 'project__list__section'
  projectListHeaderTitle.innerText = 'Projects';
  newProjectButton.innerText = 'New +';
  projectListContainer.className = 'project__list';


  projectListHeader.appendChild(projectListHeaderTitle);
  projectListHeader.appendChild(newProjectButton);
  projectListSection.appendChild(projectListHeader);
  projectListSection.appendChild(projectListContainer);
  root.appendChild(projectListSection);
  return projectListContainer;
}

function initTodoListSection() {
  const todoListSection = document.createElement('div');
  todoListSection.className = 'todo__list__section'
  const todoListHeader = document.createElement('div');
  const todoListTitle = document.createElement('span');
  const newTodoItemButton = document.createElement('button');
  newTodoItemButton.addEventListener('click', (e) => {
    e.preventDefault();
    createTaskAndAddToProject();
  })
  const todoList = document.createElement('div');
  todoList.className = 'todo__list';
  todoListTitle.innerText = 'Tasks'
  newTodoItemButton.innerText = '+';

  todoListSection.appendChild(todoListHeader);
  todoListHeader.appendChild(todoListTitle);
  todoListHeader.appendChild(newTodoItemButton);
  todoListSection.appendChild(todoList);
  root.appendChild(todoListSection);
  return todoList;
}


const root = document.querySelector('#root');
const projectListContainer = initProjectListSection();
const todoList = initTodoListSection();
let activeProject = projectList[0];





export { populateProjectListUI, populateToDoListUI };