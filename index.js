const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const choices = ["Add an engineer", "Add an intern", "Finish building the team"]


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
        name: 'officeNumber',
        message: "What is the Team Manager's office number?"
    },
    {
        type: 'list',
        name: 'nextAction',
        message: "What would you like to to do next?",
        choices: choices,
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
        message: "What is the Engineer's ID?"
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Engineer's email address?"
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: "What is the Engineer's GitHub username?"
    }
]

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the Intern's name"
    },
    {
        type: 'input',
        name: 'employeeID',
        message: "What is the Intern's ID?"
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Intern's email address?"
    },
    {
        type: 'input',
        name: 'school',
        message: "What is the Intern's school?"
    },
]



//Function to get selected choices
function getSelectedChoiceIndex(selection) {
    for (let index = 0; index < choices.length; index++) {
        if (selection.toLowerCase() == choices[index].toLowerCase()) {
            console.log(index)
            return index;
        }
    }

}


function init() {

    const allEmployers = []

    inquirer.prompt(teamManagerQuestions).then((teamManagerAnswers) => {

        let manager = new Manager(teamManagerAnswers.name, teamManagerAnswers.employeeID, teamManagerAnswers.emailAddress, teamManagerAnswers.officeNumber)

        allEmployers.push(manager)

        render.generateTeam()

        // switch (getSelectedChoiceIndex(teamManagerAnswers.nextAction)) {
        //     case 0:
        //         inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
        //             let engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.emailAddress, engineerAnswers.githubUsername)

        //             allEmployers.push(engineer)
        //         });
        //         break;
        //     case 1:
        //         inquirer.prompt(internQuestions).then((internAnswers) => {
        //             let intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.emailAddress, internAnswers.school)

        //             allEmployers.push(intern)
        //         });
        //         break;

        //     default:
        //         break;
        // }

    });


}


// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (error) => {
        error ? console.error(error) : console.log(`File generated successfully, located here ${fileName}`)
    })
}

//function call to initialize program
init()




