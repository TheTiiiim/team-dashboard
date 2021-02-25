class Employee {
    #id;
    #name;
    #email;

    constructor(id, name, email) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getEmail() {
        return this.#email;
    }

    getRole() {
        return this.constructor.name;
    }
};

module.exports = Employee;