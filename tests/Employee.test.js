const Employee = require("../lib/Employee");

describe("Employee", () => {
    describe("getId", () => {
        it("should return correct id", () => {
            const id = 1;
            const e = new Employee(id, "", "");
            expect(e.getId()).toEqual(id);
        });
    });

    describe("getName", () => {
        it("should return correct name", () => {
            const name = "jason";
            const e = new Employee(0, name, "");
            expect(e.getName()).toEqual(name);
        });
    });

    describe("getEmail", () => {
        it("should return correct email", () => {
            const email = "jason";
            const e = new Employee(0, "", email);
            expect(e.getEmail()).toEqual(email);
        });
    });

    describe("getRole", () => {
        it("should return correct role", () => {
            const e = new Employee(0, "", "");
            expect(e.getRole()).toEqual("Employee");
        });
    });
});