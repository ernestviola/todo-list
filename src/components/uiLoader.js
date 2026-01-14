import Project from './project';
import ToDo from './todo';

function populateProjectListUI(projectList) {

  for (let i = 0; i < projectList.length; i++) {
    const project = projectList[i];
    if (!(project instanceof Project)) {
      throw Error('Unable to populate project list becuase obj is not a project');
    }
    const projectContainer = document.createElement('div');
    const projectName = document.createElement('span');
    projectName.innerText = project.name;
    projectContainer.appendChild(projectName);
    projectContainer.addEventListener('click', () => {
      populateToDoListUI(project);
    })
    projectListContainer.appendChild(projectContainer);
  }
}

function populateToDoListUI(project) {
  todoList.replaceChildren();
  if (!(project instanceof Project)) {
    throw Error('Unable to populate todo list because obj is not a project');
  }
  for (let i = 0; i < project.toDoItems.length; i++) {
    const currentToDoItem = project.toDoItems[i];
    const toDoItemContainer = document.createElement('div');
    const toDoItemName = document.createElement('span');

    toDoItemName.innerText = currentToDoItem.title;
    toDoItemContainer.append(toDoItemName);

    toDoItemContainer.className = 'to__do__item';

    todoList.append(toDoItemContainer);
  }
}

function populateToDoItemUI(todoItem) {
  if (!(todoItem instanceof ToDo)) {
    throw Error('Unable to populate todo item because obj is not a todo');
  }


}

function initLayout() {

  // create the new note and the new project buttons
  projectListContainer.className = 'project__list';
  todoList.className = 'todo__list';
  todoItem.className = 'todo__item';
  root.appendChild(projectListContainer);
  root.appendChild(todoList);
  root.appendChild(todoItem);
}

const root = document.querySelector('#root');
const projectListContainer = document.createElement('div');
const todoList = document.createElement('div');
const todoItem = document.createElement('div');





export { initLayout, populateProjectListUI, populateToDoListUI };