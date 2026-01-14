if (!localStorage.projects) {
  createDefaultProjectList();
} else {
  projects.list = localStorage.projects
  projects.selected = localStorage.projects[0];
}