const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
    describe("getId", () => {
        it("should return correct id", () => {
            const id = 1;
            const e = new Engineer(id, "", "", 0);
            expect(e.getId()).toEqual(id);
        });
    });

    describe("getName", () => {
        it("should return correct name", () => {
            const name = "jason";
            const e = new Engineer(0, name, "", 0);
            expect(e.getName()).toEqual(name);
        });
    });

    describe("getEmail", () => {
        it("should return correct email", () => {
            const email = "jason";
            const e = new Engineer(0, "", email, 0);
            expect(e.getEmail()).toEqual(email);
        });
    });

    describe("getRole", () => {
        it("should return correct role", () => {
            const e = new Engineer(0, "", "", 0);
            expect(e.getRole()).toEqual("Engineer");
        });
    });

    describe("getGithub", () => {
        it("should return correct office number", () => {
            const github = "TheTiiiim";
            const e = new Engineer(0, "", "", github);
            expect(e.getGithub()).toEqual(github);
        });
    });
});