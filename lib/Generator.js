const fs = require("fs");
const fsPromise = fs.promises;
const path = require("path");

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
    return `<div class="col d-flex justify-content-center align-items-center"><div class="card" style="width: 18rem;"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">${employee.getRole()}</div><h4 class="card-title m-0">${employee.getName()}</h4></div><div class="card-body"><ul class="list-group">${propertyList}</ul></div></div></div>`;
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
            console.log("Team dashboard created!");
        });
    }).catch((err) => {
        console.error(err);
    });
}

if (process.env.NODE_ENV === "test") {
    module.exports = { generateOutput, generateCard };
} else {
    module.exports = { generateOutput };
}