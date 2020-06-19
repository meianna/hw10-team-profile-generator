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

function generateHtml() {
  let openHtml = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>My Team</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="style.css">
      <script src="https://kit.fontawesome.com/c502137733.js"></script>
  </head>
  
  <body>
      <div class="container-fluid">
          <div class="row">
              <div class="col-12 jumbotron mb-3 team-heading">
                  <h1 class="text-center">My Team</h1>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="team-area col-12 d-flex justify-content-center">`;
  let managerHtml = "";
  for (let i = 0; i < managerList.length; i++) {
    managerHtml += `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${managerList[i].name}</h2>
        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>Manager</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID:${managerList[i].id}</li>
            <li class="list-group-item">Email: <a href="mailto:${managerList[i].email}">${managerList[i].email}</a></li>
            <li class="list-group-item">Office number: ${managerList[i].officeNumber} </li>
        </ul>
    </div>
</div>
`;
  }
  let engineerHtml = "";
  for (let i = 0; i < engineerList.length; i++) {
    engineerHtml += `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${engineerList[i].name}</h2>
        <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>Engineer</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID:${engineerList[i].id}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineerList[i].email}">${engineerList[i].email}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${engineerList[i].github}" target="_blank" rel="noopener noreferrer">${engineerList[i].github}</a></li>
        </ul>
    </div>
</div>
`;
  }
  let internHtml = "";
  for (let i = 0; i < internList.length; i++) {
    internHtml += `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${internList[i].name}</h2>
        <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>Intern</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID:${internList[i].id}</li>
            <li class="list-group-item">Email: <a href="mailto:${internList[i].email}">${internList[i].email}</a></li>
            <li class="list-group-item">School:${internList[i].school}</li>
        </ul>
    </div>
</div>
`;
  }
  let closeHtml = `</div>
  </div>
</div>
</body>

</html>`;
  let html = openHtml + managerHtml + engineerHtml + internHtml + closeHtml;
  fs.writeFileSync("./index.html", html, function () {
    console.log("file generated");
  });
}

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
