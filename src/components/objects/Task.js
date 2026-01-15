// make a factory function or a class constructor
// factory functions are smaller objects that don't get changed often.

import { saveProjectList } from '../projectLogic';

// title, description, dueDate, priority
export default class Task {
  title;
  description;
  dueDate;
  priority;

  constructor(title = 'untitled', description = 'description', dueDate = 'date', priority = 'priority') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // I'd rather project maintain priority using some sort of list
  }

  updateTask(title = 'untitled', description = 'description', dueDate = 'date', priority = 'priority') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // I'd rather project maintain priority using some sort of list
    saveProjectList();
  }
}