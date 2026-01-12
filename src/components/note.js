// make a factory function or a class constructor
// factory functions are smaller objects that don't get changed often.
// title, description, dueDate, priority
export default class Note {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // I'd rather project maintain priority using some sort of list
  }

  get title() {
    return this.title;
  }

  set title(value) {
    this.title = value;
  }

  get description() {
    return this.description;
  }

  set description(value) {
    this.description = value;
  }

  get dueDate() {
    return this.dueDate;
  }

  set dueDate(value) {
    this.dueDate = value;
  }

  get priority() {
    return this.priority;
  }

  set priority(value) {
    this.priority = value;
  }
}