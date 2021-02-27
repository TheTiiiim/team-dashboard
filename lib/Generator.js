const fsPromise = require("fs/promises");

function generateCard(employee) {
    let propertyList = `<li class="list-group-item">ID: ${employee.getId()}</li><li class="list-group-item">Email: <a target="_blank" href="${employee.getEmail()}">${employee.getEmail()}</a></a></li>`;

    switch (employee.getRole()) {
        case "Manager":
            propertyList += `<li class="list-group-item">Office Number: ${employee.getOfficeNumber()}</li>`
            break;
    }

    return `<div class="col d-flex justify-content-center align-items-center"><div class="card" style="width: 18rem;"><div class="card-header"><div role="doc-subtitle" class="card-subtitle text-muted m-0">${employee.getRole()}</div><h4 class="card-title m-0">${employee.getName()}</h4></div><div class="card-body"><ul class="list-group">${propertyList}</ul></div></div></div>`;
};

function generateHtml(employees) {
    if (!Array.isArray(employees)) return;
}

if (process.env.NODE_ENV === "test") {
    module.exports = { generateHtml, generateCard };
} else {
    module.exports = { generateHtml };
}