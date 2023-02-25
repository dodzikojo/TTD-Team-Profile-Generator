const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const team = require("./src/page-template.js");

const choices = ["Add an engineer", "Add an intern", "Finish building the team"]

const teamSetupArr = []


const teamManagerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the Team Manager's name"
    },
    {
        type: 'input',
        name: 'employeeID',
        message: "What is the Team Manager's ID?",
        validate(value) {
            if (isNaN(value)) {
                return 'Please input a valid number'
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Team Manager's email address?",
        validate(value) {
            if (!ValidateEmail(value)) {
                return 'Please input a valid email address'
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the Team Manager's office number?",
        validate(value) {
            if (isNaN(value)) {
                return 'Please input a valid phone number'
            }
            else{
                return true;
            }
        }
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
        message: "What is the Engineer's ID?",
        validate(value) {
            if (isNaN(value)) {
                return 'Please input a valid number'
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Engineer's email address?",
        validate(value) {
            if (ValidateEmail(value)) {
                return 'Please input a valid email address'
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: "What is the Engineer's GitHub username?"
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

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the Intern's name"
    },
    {
        type: 'input',
        name: 'employeeID',
        message: "What is the Intern's ID?",
        validate(value) {
            if (isNaN(value)) {
                return 'Please input a valid number'
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: "What is the Intern's email address?",
        validate(value) {
            if (ValidateEmail(value)) {
                return 'Please input a valid email address'
            }
            else{
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "What is the Intern's school?"
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

function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }


//Function to get selected choices
function getSelectedChoiceIndex(selection) {
    for (let index = 0; index < choices.length; index++) {
        if (selection.toLowerCase() == choices[index].toLowerCase()) {
            return index;
        }
    }

}


//function to ask questions to generaate the intern object.
function askInternQuestions() {
    inquirer.prompt(internQuestions).then((internAnswers) => {

        let intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.emailAddress, internAnswers.school)
        teamSetupArr.push(intern)

        switch (getSelectedChoiceIndex(internAnswers.nextAction)) {
            case 0:
                askEngineerQuestions()
                break;
            case 1:
                askInternQuestions()
                break;
            case 2:
                writeToFile(outputPath, team(teamSetupArr))
                break;
        }

    });
}

//function to ask questions to generaate the engineer object.
function askEngineerQuestions() {
    inquirer.prompt(engineerQuestions).then((engineerAnswers) => {

        let engineer = new Manager(engineerAnswers.name, engineerAnswers.employeeID, engineerAnswers.emailAddress, engineerAnswers.officeNumber)
        teamSetupArr.push(engineer)

        switch (getSelectedChoiceIndex(engineerAnswers.nextAction)) {
            case 0:
                askEngineerQuestions()
                break;
            case 1:
                askInternQuestions()
                break;
            case 2:
                writeToFile(outputPath, team(teamSetupArr))
                break;
        }

    });
}



//Starting point of the application. Sets the questions for manager.
function init() {
    inquirer.prompt(teamManagerQuestions).then((teamManagerAnswers) => {

        let manager = new Manager(teamManagerAnswers.name, teamManagerAnswers.employeeID, teamManagerAnswers.emailAddress, teamManagerAnswers.officeNumber)
        teamSetupArr.push(manager)

        switch (getSelectedChoiceIndex(teamManagerAnswers.nextAction)) {
            case 0:

                askEngineerQuestions()
                break;
            case 1:
                askInternQuestions()
                break;
            case 2:
                writeToFile(outputPath, team(teamSetupArr))
                break;
        }


    });

}


// function to write README file
function writeToFile(outputPath, data) {
    fs.writeFile(outputPath, data, (error) => {
        error ? console.error(error) : console.log(`File generated successfully, located here ${outputPath}`)
    })
}


//function call to initialize program
init()




