const fsPromise = require("fs/promises");

const Generator = require("./lib/Generator");
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

let employees = [];

Generator.generateHtml(employees).then((data) => {
	return fsPromise.writeFile("./dist/dashboard.html", data).then(() => {
		console.log("Team dashboard created!");
	});
}).catch((err) => {
	console.error(err);
});