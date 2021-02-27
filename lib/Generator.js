const fsPromise = require("fs/promises");
const path = require('path');

function generateCard(employee) {
    let propertyList = `<li class="list-group-item">ID: ${employee.getId()}</li><li class="list-group-item">Email: <a target="_blank" href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></a></li>`;

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

    return `<div class="col d-flex justify-content-center align-items-center"><div class="card" style="width: 18rem;"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">${employee.getRole()}</div><h4 class="card-title m-0">${employee.getName()}</h4></div><div class="card-body"><ul class="list-group">${propertyList}</ul></div></div></div>`;
};

async function generateHtml(employees) {
    if (!Array.isArray(employees)) return;

    let filePath = path.normalize(__dirname).split(path.sep);
    filePath.pop();
    filePath = path.join(filePath.join(path.sep), "src", "template.html")

    return fsPromise.readFile(filePath, "utf8").then((data) => {
        let employeeCards = "";

        employees.forEach(employee => {
            employeeCards += generateCard(employee);
        });

        return data.replace("__cards__", employeeCards);
    }).catch((err) => {
        console.error(err);
    });
}

if (process.env.NODE_ENV === "test") {
    module.exports = { generateHtml, generateCard };
} else {
    module.exports = { generateHtml };
}