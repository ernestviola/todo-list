// make a factory function or a class constructor
export default class Project {
  constructor(name) {
    this._notes = [];
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  add(obj) {
    this._notes.push(obj);
  }

  remove(note) {
    //find the array location of the note then delete it
  }


  // add
  // delete
}