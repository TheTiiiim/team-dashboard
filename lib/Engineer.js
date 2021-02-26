const Employee = require("./Employee");

class Engineer extends Employee {
    #github;

    constructor(id, name, email, github) {
        super(id, name, email);
        this.#github = github;
    }

    getGithub() {
        return this.#github;
    }
}

module.exports = Engineer;