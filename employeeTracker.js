// const path = require('path');
// require('dotenv').config({ path: require('find-config')('.env') })
var mysql = require("mysql");
var inquirer = require("inquirer");
var logo = require('asciiart-logo');
var config = require('./package.json');

var connection = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 3306,
    user: "root",
    password: "",
    database: "employeeDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    mainMenu();
  });



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
                    viewEmployees();

                    break;
                case 'Add Employee':
                    // Add an employee
                    addEmployee();

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
                    connection.end();

                    break;
            }

        });

}

function viewEmployees() {
    // TODO: get the employees from the db
    var query = "SELECT employees.first_name, employees.last_name, roles.title FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.name";

    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
    })

    // Display employees to the console with console.table

    // return user to the main menu


}

function addEmployee() {

    // TODO: Get a list of roles from the db and store in an array
    const rolesArray = [];

    // TODO: Get a list of all employees as objects and store in an array
    let employeesArray = [];

    // Ask for the employee's information
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name",
        },
        {
            type: 'list',
            name: 'role',
            message: "Enter the employee's role",
            choices: rolesArray
        },
        {
            type: 'list',
            name: 'manager',
            message: "Select this employee's manager",
            choices: employeesArray
        }
    ]).then(answers => {

        // Create a new employee from the inputs
        let newEmployee = {
            first_name: answers.first_name,
            last_name: answers.last_name,
            // TODO: Update this to return the role id of the employee selected
            role_id: 0,
            // TODO: Update this to return the employee id of the manager selected
            manager_id: 0
        }

        // TODO: Push new employee to the DB THEN return user to the main menu


    });
}

