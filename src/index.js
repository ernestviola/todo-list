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
import { projectList } from './components/projectLogic';
import { initLayout, populateProjectListUI, populateToDoListUI } from './components/uiLoader';
import { autoPopulateProjectList } from './tests/test';

initLayout();
autoPopulateProjectList(projectList);
populateProjectListUI(projectList);

populateToDoListUI(projectList[0]);