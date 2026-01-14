/* 
Pseuodocode

project Container
-- a private variable that is the default project

-- undeletable default project
-- new projects are added to the project containe
-- we can remove empty projects

new notes are added based on the project
notes can be moved between projects

*/

import './styles.css'
import Note from './components/note';
import Project from './components/project';

function autoPopulateProjectList() {
  for (let i = 0; i < 5; i++) {
    const testProject = new Project(`Project ${i}`)
    const testNote = new Note(`Note ${i}`);
    testProject.add(testNote);
    projects.push(testProject);
  }
}

function populateProjectsUI() {
  for (let i = 0; i < projects.length; i++) {
    const projectContainer = document.createElement('div');
    const projectName = document.createElement('span');
    projectName.innerText = projects[i].name;
    projectContainer.appendChild(projectName);

    projectListContainer.appendChild(projectContainer);
  }
}

function populateNotesUI() {
  notesListContainer.replaceChildren();
}

const root = document.querySelector('#root');
const projectListContainer = document.createElement('div');
const notesListContainer = document.createElement('div');
const noteContainer = document.createElement('div');

projectListContainer.className = 'projects__container';
notesListContainer.className = 'notes__container';
noteContainer.className = 'note';
root.appendChild(projectListContainer);
root.appendChild(notesListContainer);
root.appendChild(noteContainer);

const projects = [];
const defaultProject = new Project('default');
const openingNote = new Note();

defaultProject.add(openingNote);
projects.push(defaultProject);

autoPopulateProjectList();
populateProjectsUI();