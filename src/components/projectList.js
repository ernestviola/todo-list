export default class ProjectList {
  constructor() {
    this._projects = [];
  }

  add(obj) {
    this._projects.push(obj);
  }
}