// make a factory function or a class constructor
// factory functions are smaller objects that don't get changed often.

import { saveProjectList } from '../projectLogic';

// title, description, dueDate, priority
export default class Task {
  title;
  description;
  dueDate;
  priority;

  constructor(title = '', description = '', dueDate, priority) {
    if (!dueDate) {
      dueDate = new Date().toUTCString();
    }

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // I'd rather project maintain priority using some sort of list
    this.complete = null;
  }

  updateTask(title, description, dueDate, priority, complete) {
    if (dueDate) {
      dueDate = new Date(
        Date.parse(dueDate)
      ).toUTCString();
    } else {
      dueDate = new Date().toUTCString();
    }
    this.title = title ? title : this.title;
    this.description = description ? description : this.description;
    this.dueDate = dueDate;
    this.priority = priority ? priority : this.priority;
    this.complete = complete === null ? complete : this.complete;
    saveProjectList();
  }
}