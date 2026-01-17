// check to see if there is a project list in storage if not create a new one
// function -> new Project and add to storage -> a project should be able to create new notes

import Task from './objects/Task';
import Project from './objects/Project';
import { storage } from './storageLoader';

const projectListInit = () => {
  function rebuildProjectList(savedProjects) {
    const builtProjectList = [];
    savedProjects.forEach((project) => {
      const projectObj = new Project(project.name, project.uuid);
      project.tasks.forEach((task) => {
        const taskObj = new Task(
          task.title,
          task.description,
          task.dueDate,
          task.priority,
        )
        projectObj.tasks.push(taskObj);
      })
      builtProjectList.push(projectObj);
    })
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
