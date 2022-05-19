// dependencies
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// creating connection to SQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  //* Replace password with your own as a string */
  password: process.env.SQL_PW,
  database: "tracker_db",
});

db.connect(function (err) {
  if (err) {
    console.error("error found", err);
  } else {
    console.log(`Connected to tracker_db`);
    promptQuestions();
  }
});

// prompting menu options
const promptQuestions = () => {
  console.log(`
-----------------------------
|                           |
|                           |
|     EMPLOYEE TRACKER      |
|                           |
|                           |
-----------------------------
  `);
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Departments",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then((userChoice) => {
      if (userChoice.menu === "View All Departments") {
        viewDept();
        console.log(`
        --------------------
        VIEW ALL DEPARTMENTS
        --------------------
        `);
      }
      if (userChoice.menu === "View All Roles") {
        viewRoles();
        console.log(`
    --------------
    VIEW ALL ROLES
    --------------
    `);
      }
      if (userChoice.menu === "View All Employees") {
        viewEmployees();
        console.log(`
    ------------------
    VIEW ALL EMPLOYEES
    ------------------
    `);
      }
      if (userChoice.menu === "Add Departments") {
        addDepartment();
        console.log(`
        --------------
        ADD DEPARTMENT
        --------------
        `);
      }
      if (userChoice.menu === "Add Role") {
        addRole();
        console.log(`
        --------
        ADD ROLE
        --------
        `);
      }
      if (userChoice.menu === "Add Employee") {
        addEmployee();
        console.log(`
        ------------
        ADD EMPLOYEE
        ------------
        `);
      }
      if (userChoice.menu === "Update Employee Role") {
        updateEmployee();
        console.log(`
    ---------------
    UPDATE EMPLOYEE
    ---------------
    `);
      }
      if (userChoice.menu === "Quit") {
        quit();
        console.log(`
-----------------------------
|                           |
|                           |
|         GOOD BYE!         |
|                           |
|                           |
-----------------------------
  `);
      }
    });
};

// viewing departments
const viewDept = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result);
    }
  });
  promptQuestions();
};

// viewing roles
const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result);
    }
  });
  promptQuestions();
};

// view employees
const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.table(result);
    }
  });
  promptQuestions();
};

// add department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      const params = [answers.departmentName];
      db.query(
        `INSERT INTO department (department_name) VALUES (?)`,
        [params],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            viewDept();
          }
        }
      );
      promptQuestions();
    });
};

// add role
const addRole = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const deparmentList = result.map((x) => x.department_name);

      inquirer
        .prompt([
          {
            type: "input",
            name: "addRoles",
            message: "What is the role name?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?",
          },
          {
            type: "list",
            name: "roleDepartment",
            message: "What department does this role belong to?",
            choices: deparmentList,
          },
        ])
        .then((answers) => {
          // console.log(answers);
          const params = [
            answers.addRoles,
            answers.salary,
            answers.roleDepartment,
          ];
          db.query(
            `INSERT INTO role (title, salary, department_id) VALUES (?)`,
            [params],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                viewRoles();
              }
            }
          );
          promptQuestions();
        });
    }
  });
};

// add employee
const addEmployee = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const empRole = result.map((x) => x.department_id);
      const empMgr = result.map((x) => x.manager_id);

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employees first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?",
          },
          {
            type: "list",
            name: "employeeRole",
            message: "What is the role of the employee?",
            choices: empRole,
          },
          {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee manager",
            choices: empMgr,
          },
        ])
        .then((answers) => {
          //   console.log(answers);
          const params = [
            answers.firstName,
            answers.lastName,
            answers.employeeRole,
            answers.employeeManager,
          ];
          db.query(
            `INSERT INTO employee (first_name, last_name) VALUES (?)`,
            [params],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                viewEmployees();
              }
            }
          );
          promptQuestions();
        });
    }
  });
};

// update employee
const updateEmployee = () => {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      prompt
        .inquirer([
          {
            type: "list",
            name: "employeeUpdate",
            message: "Which employee do you want to update?",
            choices: "",
          },
          {
            type: "list",
            name: "employeeRole",
            message: "What is the role of the employee?",
            choices: "",
          },
          {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee manager",
            choices: "",
          },
        ])
        .then((answers) => {
          //   console.log(answers);
          const params = [
            answers.employeeUpdate,
            answers.employeeRole,
            answers.employeeManager,
          ];
          db.query(
            `INSERT INTO employee (first_name, last_name) VALUES (?)`,
            [params],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                viewEmployees();
              }
            }
          );
          promptQuestions();
        });
    }
  });
};

// quit application
const quit = () => {
  console.log("quit");
};
