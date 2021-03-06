// ============================ dependencies ============================
require("dotenv").config();
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// ============================ creating connection to SQL ============================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  //* REPLACE PASSWORD WITH YOUR OWN AS A STRING */
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

// ============================ prompting menu options ============================

const promptQuestions = () => {
  console.log(`
-----------------------------
|                           |
|     EMPLOYEE TRACKER      |
|     ________________      |
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
          "Update Employee",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
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
        console.log(`
        --------------------
        |                  |
        |  ADD DEPARTMENT  |
        |                  |
        --------------------
        `);
        addDepartment();
      }
      if (userChoice.menu === "Add Role") {
        console.log(`
        --------------
        |            |
        |  ADD ROLE  |
        |            |
        --------------
        `);
        addRole();
      }
      if (userChoice.menu === "Add Employee") {
        console.log(`
        ------------------
        |                |
        |  ADD EMPLOYEE  |
        |                |
        ------------------
        `);
        addEmployee();
      }
      if (userChoice.menu === "Update Employee") {
        console.log(`
    ---------------------
    |                   |
    |  UPDATE EMPLOYEE  |
    |                   |
    ---------------------
    `);
        updateEmployee();
      }

      if (userChoice.menu === "Delete Department") {
        console.log(`
    ---------------------------
    |                         |
    |    DELETE DEPARTMENT    |
    |                         |
    ---------------------------
    `);
        deleteDepartment();
      }

      if (userChoice.menu === "Delete Role") {
        console.log(`
    ---------------------
    |                   |
    |    DELETE ROLE    |
    |                   |
    ---------------------
    `);
        deleteRole();
      }

      if (userChoice.menu === "Delete Employee") {
        console.log(`
    ---------------------
    |                   |
    |  DELETE EMPLOYEE  |
    |                   |
    ---------------------
    `);
        deleteEmployee();
      }

      if (userChoice.menu === "Quit") {
        quit();
      }
    });
};

// ============================ viewing departments ============================
const viewDept = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`
        -------------------------
        |                       |
        |    ALL DEPARTMENTS    |
        |                       |
        -------------------------
        `);
      console.table(result);
    }
  });
  promptQuestions();
};

// ============================ viewing roles ============================
const viewRoles = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`
    -------------------
    |                 |
    |    ALL ROLES    |
    |                 |
    -------------------
    `);
      console.table(result);
    }
  });
  promptQuestions();
};

// ============================ view employees ============================
const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`
    -------------------------
    |                       |
    |     ALL EMPLOYEES     |
    |                       |
    -------------------------
    `);
      console.table(result);
    }
  });
  promptQuestions();
};

// ============================ add department ============================
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
    });
};

// ============================ add role ============================
const addRole = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const deparmentList = result.map((x) => ({
        name: x.department_name,
        value: x.id,
      }));

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
        });
    }
  });
};

// ============================ add employee ============================
const addEmployee = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const empRole = result.map((x) => ({
        name: x.title,
        value: x.department_id,
      }));

      db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const empMgr = result.map((x) => ({
            name: x.first_name + " " + x.last_name,
            value: x.id,
          }));

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
              const params = [
                answers.firstName,
                answers.lastName,
                answers.employeeRole,
                answers.employeeManager,
              ];
              db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`,
                [params],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    viewEmployees();
                  }
                }
              );
            });
        }
      });
    }
  });
};

// ============================ update employee ============================
const updateEmployee = () => {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const employee = result.map((x) => ({
        name: x.first_name + " " + x.last_name,
        value: x.id,
      }));
      db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const role = result.map((x) => ({
            name: x.title,
            value: x.id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "employeeUpdate",
                message: "Which employee do you want to update?",
                choices: employee,
              },
              {
                type: "list",
                name: "mgrUpdate",
                message: "Who is the new manager?",
                choices: employee,
              },
              {
                type: "list",
                name: "roleUpdate",
                message: "What is the new role?",
                choices: role,
              },
            ])
            .then((answers) => {
              db.query(
                `UPDATE employee SET manager_id = ?, role_id = ? WHERE id = ?`,
                [answers.mgrUpdate, answers.roleUpdate, answers.employeeUpdate],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    viewEmployees();
                  }
                }
              );
            });
        }
      });
    }
  });
};

// ============================ delete employee ============================
const deleteEmployee = () => {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const employee = result.map((x) => ({
        name: x.first_name + " " + x.last_name,
        value: x.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeDelete",
            message: "Which employee do you want to delete?",
            choices: employee,
          },
        ])
        .then((answers) => {
          db.query(
            `DELETE FROM employee WHERE id = ?`,
            answers.employeeDelete,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                viewEmployees();
              }
            }
          );
        });
    }
  });
};

// ============================ delete role ============================
const deleteRole = () => {
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const employee = result.map((x) => ({
        name: x.title,
        value: x.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeDelete",
            message: "Which employee do you want to delete?",
            choices: employee,
          },
        ])
        .then((answers) => {
          db.query(
            `DELETE FROM role WHERE id = ?`,
            answers.employeeDelete,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                viewRoles();
              }
            }
          );
        });
    }
  });
};

// ============================ delete department ============================
const deleteDepartment = () => {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const department = result.map((x) => ({
        name: x.department_name,
        value: x.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeDelete",
            message: "Which department do you want to delete?",
            choices: department,
          },
        ])
        .then((answers) => {
          db.query(
            `DELETE FROM department WHERE id = ?`,
            answers.employeeDelete,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                viewDept();
              }
            }
          );
        });
    }
  });
};

// ============================ quit application ============================
const quit = () => {
  console.log(`
-----------------------------
|                           |
|         GOOD BYE!         |
|         _________         |
|                           |
-----------------------------
  `);
};


