import Task from './Task';

// make a factory function or a class constructor
export default class Project {
  constructor(name) {
    this._tasks = [];
    this._name = name;
    this.uuid = crypto.randomUUID();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  add(obj) {
    this._tasks.push(obj);
  }

  get tasks() {
    return this._tasks;
  }

  createTask(title = 'untitled', description = '', dueDate = '', priority = '') {
    const task = new Task(title, description, dueDate, priority);
    this._tasks.push(task);
    return task;
  }
}