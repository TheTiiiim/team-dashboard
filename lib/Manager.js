const Employee = require("./Employee");

class Manager extends Employee {
    #officeNumber;

    constructor(id, name, email, officeNumber) {
        super(id, name, email);
        this.#officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.#officeNumber;
    }
}

module.exports = Manager;