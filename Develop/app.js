const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let managerList = [];
let engineerList = [];
let internList = [];

function display() {
  inquirer
    .prompt([
      {
        type: "list",
        choices: ["manager", "intern", "engineer", "exit application"],
        message: "What would you like to display?",
        name: "userChoice",
      },
    ])
    .then(function (res) {
      switch (res.userChoice) {
        case "manager":
          addManager();
          break;
        case "intern":
          addIntern();
          break;
        case "engineer":
          addEngineer();
          break;
        default:
          generateHtml();
          break;
      }
    });
}

function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter name of manager",
        name: "name",
      },
      {
        type: "input",
        message: "Enter id of manager",
        name: "id",
      },
      {
        type: "input",
        message: "Enter email of manager",
        name: "email",
      },
      {
        type: "input",
        message: "Enter office number of manager",
        name: "officeNumber",
      },
    ])
    .then(function (res) {
      let myManager = new Manager(
        res.name,
        res.id,
        res.email,
        res.officeNumber
      );
      managerList.push(myManager);
      console.log(managerList);
      display();
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter name of engineer",
        name: "name",
      },
      {
        type: "input",
        message: "Enter id of engineer",
        name: "id",
      },
      {
        type: "input",
        message: "Enter email of engineer",
        name: "email",
      },
      {
        type: "input",
        message: "Enter GitHub of engineer",
        name: "github",
      },
    ])
    .then(function (res) {
      let myEngineer = new Engineer(res.name, res.id, res.email, res.github);
      engineerList.push(myEngineer);
      console.log(engineerList);
      display();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter name of intern",
        name: "name",
      },
      {
        type: "input",
        message: "Enter id of intern",
        name: "id",
      },
      {
        type: "input",
        message: "Enter email of intern",
        name: "email",
      },
      {
        type: "input",
        message: "Enter school of intern",
        name: "school",
      },
    ])
    .then(function (res) {
      let myIntern = new Intern(res.name, res.id, res.email, res.school);
      internList.push(myIntern);
      console.log(internList);
      display();
    });
}
display();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
