// const path = require('path');
require('dotenv').config()
var mysql = require("mysql");
var inquirer = require("inquirer");
var logo = require('asciiart-logo');
var config = require('./package.json');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    renderLogo();
    mainMenu();
});



function renderLogo() {
    console.log(logo(config).render());
}

function mainMenu() {
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
                    removeEmployee();

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
    // var query = "SELECT employees.first_name, employees.last_name, roles.title FROM employees INNER JOIN roles ON employees.role_id=roles.id";

    var query = "SELECT * FROM employees";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    })
}

function addEmployee() {

    // TODO: Get a list of roles from the db and store in an array
    const rolesArray = ["Manager", "Engineer", "Intern"];

    // TODO: Get a list of all employees as objects and store in an array
    let employeesArray = [1, 2, 3];

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

        // TODO: add employee to the db
        connection.query("INSERT INTO employees SET ?", newEmployee, function (err) {
            if (err) throw err;
            console.log("Employee added successfully!");
            // take user back to main menu
            mainMenu();
        });

    });
}

function removeEmployee() {
    var query = "SELECT first_name, last_name, id FROM employees";
    let employees = []

    connection.query(query, function (err, res) {
        if (err) throw err;

        employees = res;

        // console.log(employees);

        employeeNames = res.map(employee => {
            return `${employee.first_name} ${employee.last_name}`;
        });

        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeToDelete',
                message: "Which employee would you like to delete?",
                choices: employeeNames
            }
        ]).then(answers => {
            const employeeIndex = employeeNames.indexOf(answers.employeeToDelete);

            employeeID = employees[employeeIndex].id;
            // console.log("Employee id to delete = " + employeeID);

            // TODO: delete employee from the db
            connection.query("DELETE FROM employees WHERE id= ?", [employeeID], function (err) {
                if (err) throw err;
                console.log("Employee deleted successfully!");
                // take user back to main menu
                mainMenu();
            });
    
        });
    });
}

