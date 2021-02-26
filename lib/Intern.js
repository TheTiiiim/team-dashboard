const Employee = require("./Employee");

class Intern extends Employee {
    #school;

    constructor(id, name, email, school) {
        super(id, name, email);
        this.#school = school;
    }

    getSchool() {
        return this.#school;
    }
}

module.exports = Intern;