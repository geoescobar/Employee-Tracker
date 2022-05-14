// dependencies
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");

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
    // invoking main function
    promptQuestions();
  }
});

// prompting menu options
const promptQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to view",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
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
      }
      if (userChoice.menu === "View All Roles") {
        viewRoles();
      }
      if (userChoice.menu === "View All Employees") {
        viewEmployees();
      }
      if (userChoice.menu === "Add Departments") {
        addDepartment();
      }
      if (userChoice.menu === "Add Role") {
        addRole();
      }
      if (userChoice.menu === "Add Employee") {
        addEmployee();
      }
      if (userChoice.menu === "Update Employee Role") {
        updateEmployee();
      }
      if (userChoice.menu === "Quit") {
        quit();
      }
    });
};

// viewing departments
const viewDept = () => {
  //   console.log("view all departments");
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
  //   console.log("view all roles");
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
  console.log("view all employees");
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
  console.log("add department");
  return inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      const params = answers.departmentName;
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
  console.log("ADD ROLE");
  return inquirer
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
      // {
      //   type: "list",
      //   name: "roleDepartment",
      //   message: "What department does this role belong to?",
      //   choices: "",
      // },
    ])
    .then((answers) => {
      console.log(answers);
      const params = [answers.addRoles, answers.salary, answers.roleDepartment];
      db.query(
        `INSERT INTO role (title, salary) VALUES (?, ?)`[params],
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
};

// add employee
const addEmployee = () => {
  console.log("ADD EMPLOYEE");
  return inquirer
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
      // {
      //   type: "list",
      //   name: "role",
      //   message: "What is the employees role?",
      //   choices: "",
      // },
      // {
      //   type: "list",
      //   name: "manager",
      //   message: "Who is the employees manager?",
      //   choices: "",
      // },
    ])
    .then((answers) => {
      //   console.log(answers);
      const params = [answers.firstName, answers.lastName];
      db.query(
        `INSERT INTO employee (fitst_name, last_name) VALUE (?, ?)`[params],
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
};

// update employee
const updateEmployee = () => {
  console.log("update employees");
};

// quit application
const quit = () => {
  console.log("quit");
};
