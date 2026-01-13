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

console.log('Hello World');

function testNoteCreationFlow() {
  const note = new Note('Untitled',
    'here is the inner text',
    'should we only take a new date?',
    'High Priority. Maybe we should only take a list of priorities?'
  );

  const project = new Project('default');
  const projectList = new ProjectList();

  project.add(note);
  projectList.add(project);
  return projectList;
}

const newProjectList = testNoteCreationFlow();

console.log(newProjectList)
