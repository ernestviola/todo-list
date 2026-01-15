import ToDo from '../components/Task';
import Project from '../components/Project';

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

function autoPopulateProjectList(projectList) {
  for (let i = 0; i < 5; i++) {
    const testProject = new Project(`Project ${i}`)
    const testToDo = new ToDo(`ToDo ${i}`);
    testProject.add(testToDo);
    projectList.push(testProject);
  }
}

export {
  autoPopulateProjectList
};