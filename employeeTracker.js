var mysql = require("mysql");
var inquirer = require("inquirer");
var logo = require('asciiart-logo');
var config = require('./package.json');

// var connection = mysql.createConnection({
//     host: "localhost",

//     // Your port; if not 3306
//     port: 5000,

//     // Your username
//     user: process.env.userID,

//     // Your password
//     password: process.env.userPass,
//     database: "employeeDB"
// });



function renderLogo() {
    console.log(logo(config).render());
}

function mainMenu() {
    renderLogo();

    inquirer
        .prompt({
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'Add Employee',
                'Edit Employee Role',
                'Edit Employee Manager',
                'Remove Employee',
                new inquirer.Separator(),
                'View Departments',
                'View Roles',
                new inquirer.Separator(),
                'Exit'
            ],
        })
        .then((answers) => {

            switch (answers.mainMenu) {
                case 'View Employees':
                    // Display all employees

                    break;
                case 'Add Employee':
                    // Add an employee

                    break;
                case 'Edit Employee Role':
                    // Edit employee role

                    break;
                case 'Edit Employee Manager':
                    // Edit their manager

                    break;
                case 'Remove Employee':
                    // Remove the employee

                    break;
                case 'View Departments':
                    // Show all departments

                    break;
                case 'View Roles':
                    // Show all roles

                    break;
                case 'Exit':
                    // Exit the app
                    console.log("Now exiting the app.")

                    break;
            }

        });

}

mainMenu();