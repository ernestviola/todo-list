// check to see if there is a project list in storage if not create a new one
// function -> new Project and add to storage -> a project should be able to create new notes

import Task from './objects/Task';
import Project from './objects/Project';
import { storage } from './storageLoader';

const projectListInit = () => {
  function rebuildProjectList(savedProjects) {
    const builtProjectList = [];
    for (let i = 0; i < savedProjects.length; i++) {
      const currentSavedProject = savedProjects[i];
      const newProject = new Project(currentSavedProject.name, currentSavedProject.uuid);
      for (let j = 0; j < currentSavedProject.tasks.length; j++) {
        const newTask = new Task(
          currentSavedProject.tasks[j].title,
          currentSavedProject.tasks[j].description,
          currentSavedProject.tasks[j].dueDate,
          currentSavedProject.tasks[j].priority,
        )
        newProject.tasks.push(newTask);
      }
      builtProjectList.push(newProject);
    }
    return builtProjectList;
  }
  let savedProjects = storage.load('projects');
  let projectList;
  if (!savedProjects || (savedProjects && savedProjects.length == 0)) {
    projectList = [];
    const defaultProject = new Project('default');
    const openingToDo = new Task('Untitled');
    defaultProject.tasks.push(openingToDo);
    projectList.push(defaultProject);
  } else {
    projectList = rebuildProjectList(savedProjects);
    return projectList;
  }


  return projectList;
}

const createProject = () => {
  const newProject = new Project('untitled');
  projectList.push(newProject);

  saveProjectList();
  return newProject;
}

const deleteProject = (uuid) => {
  const projectIndex = projectList.findIndex((project) => {
    return project.uuid == uuid;
  });
  projectList.splice(projectIndex, 1);
  saveProjectList();
}

function saveProjectList() {
  storage.save('projects', projectList);
}


let projectList = projectListInit();

export { projectList, saveProjectList, createProject, deleteProject };
