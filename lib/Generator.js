const fs = require("fs");
const fsPromise = fs.promises;
const path = require("path");
const inquirer = require("inquirer");
const { Subject, from } = require("rxjs");

const Employee = require("./Employee")
const Manager = require("./Manager")
const Engineer = require("./Engineer")
const Intern = require("./Intern")

async function getEmployeeData(forceRole = "") {
    // return if forceRole is not empty or a value in the array below
    if (!(forceRole === "") && !["Manager", "Engineer", "Intern"].includes(forceRole)) throw Error("Employee forced role is not 'Manager', 'Engineer', or 'Intern'.");

    const employeeQuestions = [
        {
            type: "list",
            name: "role",
            message: `New employee role: `,
            choices: ["Engineer", "Intern"],
            when: (answers) => {
                if (forceRole === "") {
                    return true;
                } else {
                    answers.role = forceRole;
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "name",
            message: (answers) => { return `${answers.role} name: ` },
            validate: (input) => {
                if (input === "") return "No name provided.";
                else return true;
            },
        },
        {
            type: "input",
            name: "id",
            message: (answers) => { return `${answers.role} id: ` },
            validate: (input) => {
                if (input === "") return "No id provided.";
                else return true;
            },
        },
        {
            type: "input",
            name: "email",
            message: (answers) => { return `${answers.role} email: ` },
            validate: (input) => {
                if (input === "") return "No email provided.";
                else return true;
            },
        },
        {
            type: "input",
            name: "officeNumber",
            message: (answers) => { return `${answers.role} office number: ` },
            validate: (input) => {
                if (input === "") return "No office number provided.";
                else return true;
            },
            when: (answers) => { return (answers.role === "Manager"); }
        },
        {
            type: "input",
            name: "github",
            message: (answers) => { return `${answers.role} github username: ` },
            validate: (input) => {
                if (input === "") return "No github username provided.";
                else return true;
            },
            when: (answers) => { return (answers.role === "Engineer"); }
        },
        {
            type: "input",
            name: "school",
            message: (answers) => { return `${answers.role} school: ` },
            validate: (input) => {
                if (input === "") return "No school provided.";
                else return true;
            },
            when: (answers) => { return (answers.role === "Intern"); }
        },
    ];

    const prompts = new Subject();
    let promise = inquirer.prompt(prompts);

    const observable = from(employeeQuestions);
    observable.subscribe(prompts);

    return promise;
}

function createEmployee(data) {
    let newEmployee;
    switch (data.role) {
        case "Manager":
            newEmployee = new Manager(data.id, data.name, data.email, data.officeNumber);
            break;
        case "Engineer":
            newEmployee = new Engineer(data.id, data.name, data.email, data.github);
            break;
        case "Intern":
            newEmployee = new Intern(data.id, data.name, data.email, data.school);
            break;
        default:
            throw Error("Employee role is not 'Manager', 'Engineer', or 'Intern'.");
    }

    console.log(`\nAdded ${newEmployee.getRole()} ${newEmployee.getName()}.\n`);
    return newEmployee;
}

async function generateEmployees() {
    let employees = [];

    let firstEmployee = true;
    let looping = false;
    do {
        // get employee data, create employee instance, and add it to array
        employees.push(
            createEmployee(
                // force create manager on first run
                await getEmployeeData((firstEmployee) ? "Manager" : "")
            )
        );

        // first employee has been created
        if (firstEmployee) firstEmployee = false;

        // ask to create another employee
        looping = (await inquirer.prompt({
            type: "confirm",
            name: "continue",
            message: `Add another Employee? `,
        })).continue;
    } while (looping);

    return employees;
}

function generateCard(employee) {
    // generate shared properties
    let propertyList = `<li class="list-group-item">ID: ${employee.getId()}</li><li class="list-group-item">Email: <a target="_blank" href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></a></li>`;

    // generate unique properties
    switch (employee.getRole()) {
        case "Manager":
            propertyList += `<li class="list-group-item">Office Number: ${employee.getOfficeNumber()}</li>`
            break;
        case "Intern":
            propertyList += `<li class="list-group-item">School: ${employee.getSchool()}</li>`
            break;
        case "Engineer":
            propertyList += `<li class="list-group-item">Github: <a target="_blank" href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>`
            break;
    }

    // plug properties in a card template
    return `<div class="col mb-4"><div class="card h-100"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">${employee.getRole()}</div><h4 class="card-title m-0">${employee.getName()}</h4></div><div class="card-body"><ul class="list-group">${propertyList}</ul></div></div></div>`;
};

async function generateOutput(employees) {
    if (!Array.isArray(employees)) return;

    // get src directory
    let srcDir = __dirname.split(path.sep);
    srcDir.pop();
    srcDir = path.join(srcDir.join(path.sep), "src");

    // source files
    let templatePath = path.join(srcDir, "template.html");
    let cssPath = path.join(srcDir, "style.css");

    return fsPromise.readFile(templatePath, "utf8").then((data) => {
        // generate cards
        let employeeCards = "";
        employees.forEach(employee => {
            employeeCards += generateCard(employee);
        });

        return data.replace("__cards__", employeeCards);
    }).then((data) => {
        // get output directory
        let distDir = __dirname.split(path.sep);
        distDir.pop();
        distDir = path.join(distDir.join(path.sep), "dist");

        let htmlDestination = path.join(distDir, "dashboard.html");
        let cssDestination = path.join(distDir, "style.css");

        // ensure directory exists
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir);
        }

        // copy style.css to output folder
        fsPromise.readFile(cssPath, "utf8").then((css) => {
            return fsPromise.writeFile(cssDestination, css);
        }).catch((err) => {
            console.error(err);
        });

        // write dashboard.html
        return fsPromise.writeFile(htmlDestination, data).then(() => {
            console.log(`\nTeam dashboard created in '${htmlDestination}'!\n`);
        });
    }).catch((err) => {
        console.error(err);
    });
}

if (process.env.NODE_ENV === "test") {
    module.exports = { generateOutput, generateEmployees, generateCard, getEmployeeData, createEmployee };
} else {
    module.exports = { generateOutput, generateEmployees };
}