// check to see if there is a project list in storage if not create a new one
// function -> new Project and add to storage -> a project should be able to create new notes

import Task from './Task';
import Project from './Project';

const projectListInit = () => {
  if (localStorage.projectList) {
    return localStorage.projectList;
  }
  const projectList = []
  const defaultProject = new Project('default');
  const openingToDo = new Task('Untitled');
  defaultProject.toDoItems.push(openingToDo);
  projectList.push(defaultProject);
  return projectList;
}

const deleteProject = () => {

}


let projectList = projectListInit()





export { projectList };
