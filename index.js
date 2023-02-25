const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const teamManagerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the Team Manager's name"
    },
    {
        type: 'input',
        name: 'employeeID',
        message: "What is the Team Manager's ID?"
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Team Manager's email address?"
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Team Manager's office number?"
    },
    {
        type: 'list',
        name: 'teamMemberType',
        message: "What would you like to to do next?",
        choices: ["Add an engineer", "Add an intern", "Finish building the team"],
        filter(val) {
            return val.toLowerCase();
        }
    }
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the Engineer's name"
    },
    {
        type: 'input',
        name: 'employeeID',
        message: "What is the Team Manager's ID?"
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Team Manager's email address?"
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Team Manager's office number?"
    },
    {
        type: 'list',
        name: 'teamMemberType',
        message: "What would you like to to do next?",
        choices: ["Add an engineer", "Add an intern", "Finish building the team"],
        filter(val) {
            return val.toLowerCase();
        }
    }
]




