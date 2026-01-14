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
import ProjectList from './components/projectList';


const newProjectList = new ProjectList();

const root = document.querySelector('#root');
const projectListContainer = document.createElement('div');
projectListContainer.className = 'projects__container';

root.appendChild(projectListContainer);