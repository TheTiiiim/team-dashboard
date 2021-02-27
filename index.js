const Generator = require("./lib/Generator");

function main() {
	console.log("\nWelcome to the Team Dashboard Generator!\n");

	// use inquirer to get employee data and create array of employee objects
	Generator.generateEmployees().then((employees) => {
		// generate dashboard from array
		return Generator.generateOutput(employees);
	}).catch((err) => {
		console.error(err);
	});
}

main();