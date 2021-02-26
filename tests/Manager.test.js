const Manager = require("../lib/Manager");

describe("Manager", () => {
    describe("getId", () => {
        it("should return correct id", () => {
            const id = 1;
            const e = new Manager(id, "", "", 0);
            expect(e.getId()).toEqual(id);
        });
    });

    describe("getName", () => {
        it("should return correct name", () => {
            const name = "jason";
            const e = new Manager(0, name, "", 0);
            expect(e.getName()).toEqual(name);
        });
    });

    describe("getEmail", () => {
        it("should return correct email", () => {
            const email = "jason";
            const e = new Manager(0, "", email, 0);
            expect(e.getEmail()).toEqual(email);
        });
    });

    describe("getRole", () => {
        it("should return correct role", () => {
            const e = new Manager(0, "", "", 0);
            expect(e.getRole()).toEqual("Manager");
        });
    });

    describe("getOfficeNumber", () => {
        it("should return correct office number", () => {
            const officeNumber = 3;
            const e = new Manager(0, "", "", officeNumber);
            expect(e.getOfficeNumber()).toEqual(officeNumber);
        });
    });
});