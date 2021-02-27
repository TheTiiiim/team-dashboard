const Generator = require("./lib/Generator");

function main() {
	console.log("\nWelcome to the Team Dashboard Generator!\n");

	Generator.generateEmployees().then((employees) => {
		return Generator.generateOutput(employees);
	}).catch((err) => {
		console.error(err);
	});
}

main();