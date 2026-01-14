export default class ProjectList {
  constructor() {
    this._projects = [];
  }

  get projects() {
    return this._projects;
  }

  add(obj) {
    this._projects.push(obj);
  }
}