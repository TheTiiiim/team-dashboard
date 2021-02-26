const Intern = require("../lib/Intern");

describe("Intern", () => {
    describe("getId", () => {
        it("should return correct id", () => {
            const id = 1;
            const e = new Intern(id, "", "", "");
            expect(e.getId()).toEqual(id);
        });
    });

    describe("getName", () => {
        it("should return correct name", () => {
            const name = "jason";
            const e = new Intern(0, name, "", "");
            expect(e.getName()).toEqual(name);
        });
    });

    describe("getEmail", () => {
        it("should return correct email", () => {
            const email = "jason";
            const e = new Intern(0, "", email, "");
            expect(e.getEmail()).toEqual(email);
        });
    });

    describe("getRole", () => {
        it("should return correct role", () => {
            const e = new Intern(0, "", "", "");
            expect(e.getRole()).toEqual("Intern");
        });
    });

    describe("getSchool", () => {
        it("should return correct rolschoole", () => {
            const school = "UNH Code Boot Camp";
            const e = new Intern(0, "", "", school);
            expect(e.getSchool()).toEqual(school);
        });
    });
});