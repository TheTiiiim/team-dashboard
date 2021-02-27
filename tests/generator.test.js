const Generator = require("../lib/Generator");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const Manager = require("../lib/Manager");

describe("Generator", () => {
    describe("generateCard", () => {
        it("generates manager card", () => {
            let manager = new Manager(0, "Name", "email@example.com", 1);

            let managerCard = Generator.generateCard(manager);

            const expected = `<div class="col d-flex justify-content-center align-items-center"><div class="card" style="width: 18rem;"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">Manager</div><h4 class="card-title m-0">Name</h4></div><div class="card-body"><ul class="list-group"><li class="list-group-item">ID: 0</li><li class="list-group-item">Email: <a target="_blank" href="email@example.com">email@example.com</a></a></li><li class="list-group-item">Office Number: 1</li></ul></div></div></div>`;

            expect(managerCard).toEqual(expected);
        });

        it('generates intern card', () => {
            let intern = new Intern(0, "Name", "email@example.com", "exampleSchool");

            let internCard = Generator.generateCard(intern);

            const expected = `<div class="col d-flex justify-content-center align-items-center"><div class="card" style="width: 18rem;"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">Intern</div><h4 class="card-title m-0">Name</h4></div><div class="card-body"><ul class="list-group"><li class="list-group-item">ID: 0</li><li class="list-group-item">Email: <a target="_blank" href="email@example.com">email@example.com</a></a></li><li class="list-group-item">School: exampleSchool</li></ul></div></div></div>`;

            expect(internCard).toEqual(expected);
        });

        it('generates engineer card', () => {
            let engineer = new Engineer(0, "Name", "email@example.com", "username");

            let engineerCard = Generator.generateCard(engineer);

            const expected = `<div class="col d-flex justify-content-center align-items-center"><div class="card" style="width: 18rem;"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">Engineer</div><h4 class="card-title m-0">Name</h4></div><div class="card-body"><ul class="list-group"><li class="list-group-item">ID: 0</li><li class="list-group-item">Email: <a target="_blank" href="email@example.com">email@example.com</a></a></li><li class="list-group-item">Github: <a target="_blank" href="https://github.com/username">username</a></li></ul></div></div></div>`;

            expect(engineerCard).toEqual(expected);
        });
    });
});
