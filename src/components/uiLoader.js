import Project from './Project';
import Task from './Task';

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
    const toDoItem = project.toDoItems[i];
    const toDoItemContainer = document.createElement('div');
    const toDoItemName = document.createElement('span');

    toDoItemName.innerText = toDoItem.title;
    toDoItemContainer.append(toDoItemName);

    toDoItemContainer.className = 'to__do__item';

    toDoItemContainer.addEventListener('click', () => {
      populateToDoItemUI(toDoItem);
    })

    todoList.append(toDoItemContainer);
  }
}

function populateToDoItemUI(todo) {
  todoItem.replaceChildren();
  if (!(todo instanceof Task)) {
    throw Error('Unable to populate todo item because obj is not a todo');
  }

  const title = document.createElement('span');
  const description = document.createElement('span');
  const dueDate = document.createElement('span');
  const priority = document.createElement('priority');

  title.innerText = todo.title;
  description.innerText = todo.description;
  dueDate.innerText = todo.dueDate;
  priority.innerText = todo.priority;

  todoItem.appendChild(title);
  todoItem.appendChild(description);
  todoItem.appendChild(dueDate);
  todoItem.appendChild(priority);

}

function openNewProjectDialog() {

}

function createNewTodo() {

}

function initProjectListSection() {
  const projectListSection = document.createElement('div');
  const projectListHeader = document.createElement('div');
  const projectListHeaderTitle = document.createElement('span');
  const newProjectButton = document.createElement('button');
  const projectListContainer = document.createElement('div');

  projectListHeaderTitle.innerText = 'Projects';
  newProjectButton.innerText = 'New +';
  projectListContainer.className = 'project__list';
  projectListSection.className = 'project__list__section'

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
const todoItem = document.createElement('div');
root.appendChild(todoItem);





export { populateProjectListUI, populateToDoListUI };