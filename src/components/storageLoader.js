export const storage = {
  save(key, value) {

    localStorage.setItem(key, JSON.stringify(value))
  },

  load(key) {
    return JSON.parse(
      localStorage.getItem(key)
    );
  }
}

// return the projects object from localStorage
// save the project to localStorage