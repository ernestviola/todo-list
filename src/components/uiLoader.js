import Project from './project';

function populateProjectListUI(projectList) {

  for (let i = 0; i < projectList.length; i++) {
    const project = projectList[i];
    if (!(project instanceof Project)) {
      throw Error('Is not a project');
    }
    const projectContainer = document.createElement('div');
    const projectName = document.createElement('span');
    projectName.innerText = project.name;
    projectContainer.appendChild(projectName);
    projectContainer.addEventListener('click', () => {
      console.log(`Clicked ${projectName}`);
    })
    projectListContainer.appendChild(projectContainer);
  }
}

function populateToDoListUI(project) {
  toDoListContainer.replaceChildren();
  console.log(project)
  for (let i = 0; i < project.toDoItems.length; i++) {
    const currentToDoItem = project.toDoItems[i];
    const toDoItemContainer = document.createElement('div');
    const toDoItemName = document.createElement('span');

    toDoItemName.innerText = currentToDoItem.title;
    toDoItemContainer.append(toDoItemName);

    toDoItemContainer.className = 'to__do__item';

    toDoListContainer.append(toDoItemContainer);
  }

}

function initLayout() {
  root.appendChild(projectListContainer);
  root.appendChild(todoList);
  root.appendChild(todoItem);
}

const root = document.querySelector('#root');
const projectListContainer = document.createElement('div');
projectListContainer.className = 'project__list';
const todoList = document.createElement('div');
todoList.className = 'todo__list';
const todoItem = document.createElement('div');
todoItem.className = 'todo__item';


export { initLayout, populateProjectListUI };