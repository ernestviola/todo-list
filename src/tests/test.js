import Note from '../components/note';
import Project from '../components/project';
import ProjectList from '../components/projectList';

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