const inquirer = require("inquirer");
const mysql = require("mySql");

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

const viewDept = () => {
  console.log("view all departments");
};

const viewRoles = () => {
    console.log('view all roles');
} 

const viewEmployees = () => {
    console.log('view all employees');
}

const addDepartment = () => {
    console.log('add department');
}

const addRole = () => {
    console.log('add role');
}

const addEmployee = () => {
    console.log('add employee');
}

const updateEmployee = () => {
    console.log('update employees');
}

const quit = () => {
    console.log('quit');
}