const Generator = require("../lib/Generator");
const Manager = require("../lib/Manager");

describe("Generator", () => {
    describe("generateCard", () => {
        test('generates manager card', () => {
            let manager = new Manager(0, "Name", "email@example.com", 1);

            let managerCard = Generator.generateCard(manager);

            const expected = `<div class="col d-flex justify-content-center align-items-center"><div class="card" style="width: 18rem;"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">Manager</div><h4 class="card-title m-0">Name</h4></div><div class="card-body"><ul class="list-group"><li class="list-group-item">ID: 0</li><li class="list-group-item">Email: <a target="_blank" href="email@example.com">email@example.com</a></a></li><li class="list-group-item">Office Number: 1</li></ul></div></div></div>`;

            expect(managerCard).toEqual(expected);
        });
    });
});
