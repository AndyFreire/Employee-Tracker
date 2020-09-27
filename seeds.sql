USE employeeDB;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Doug", "Barry", 1, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Lucy", "Marie", 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Josh", "Internburg", 3, 1);


INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 150000.00, 0);

INSERT INTO roles (title, salary, department_id)
VALUES ("Developer", 120000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Intern", 0.00, 2);

INSERT INTO departments (name)
VALUES ("Product");

INSERT INTO departments (name)
VALUES ("Engineering");

INSERT INTO departments (name)
VALUES ("Marketing");


