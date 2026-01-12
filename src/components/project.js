// make a factory function or a class constructor
export default class Project {
  constructor(name) {
    this.notes = [];
    this.name = name;
  }

  get name() {
    return this.name;
  }

  set name(value) {
    this.name = value;
  }

  add(note) {
    this.notes.append(note);
  }

  remove(note) {
    //find the array location of the note then delete it
  }


  // add
  // delete
}