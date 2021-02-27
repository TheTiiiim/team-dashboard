const inquirer = require("inquirer");

const Generator = require("./lib/Generator");
const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")

let employees = [];

// TODO: use inquirer to get input to populate employees array

Generator.generateOutput(employees).catch((err) => {
	console.error(err);
});