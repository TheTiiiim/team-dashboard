const fs = require("fs");
const fsPromise = fs.promises;
const path = require('path');

const Generator = require("./lib/Generator");
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

let employees = [];

Generator.generateHtml(employees).then((data) => {
	// get output directory
	let dir = path.join(__dirname, "dist")
	let file = path.join(dir, "dashboard.html")

	// ensure directory exists
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	return fsPromise.writeFile(file, data).then(() => {
		console.log("Team dashboard created!");
	});
}).catch((err) => {
	console.error(err);
});