// make a factory function or a class constructor
export default class Project {
  constructor(name) {
    this._toDoItems = [];
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
    this._toDoItems.push(obj);
  }

  get toDoItems() {
    return this._toDoItems;
  }
}