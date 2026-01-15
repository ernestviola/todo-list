import Task from './Task';

// make a factory function or a class constructor
export default class Project {
  tasks;
  name;
  uuid;

  constructor(name, uuid = crypto.randomUUID()) {
    this.tasks = [];
    this.name = name;
    this.uuid = uuid;
  }

  createTask(title = 'untitled', description = '', dueDate = '', priority = '') {
    const task = new Task(title, description, dueDate, priority);
    this.tasks.push(task);
    return task;
  }
}