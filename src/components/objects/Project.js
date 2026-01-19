import Task from './Task';
import { saveProjectList } from '../projectLogic';

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

  createTask(title, description, dueDate, priority) {
    const task = new Task(title, description, dueDate, priority);
    this.tasks.push(task);
    saveProjectList();
    return task;
  }

  deleteTask(task) {
    const taskIndex = this.tasks.indexOf(task);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
    saveProjectList();
  }

  updateProject(name) {
    this.name = name;
    saveProjectList();
  }
}