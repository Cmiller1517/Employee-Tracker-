require("console.table");
const inquirer = require("inquirer");
const db = require("./config/connection");


// WHEN I start the application WHEN I start the application, THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const questions = async () => {
    await inquirer.prompt(
        {
          name: "menu",
          type: "list",
          message: "MAIN MENU",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Exit"
          ],
        })
        .then(function(choice) {
          switch (choice.menu) {
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
            case "View All Departments":
              allDepartments();
              break;
//   WHEN I choose to view all roles
//   THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role           //   
            case "View All Roles":
              allRoles();
              break;
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
            case "View All Employees":
              allEmployees();
              break;
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
            case "Add a Department":
              addDepartment();
              break;
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
            case "Add a Role":
              addRole();
              break;
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
            case "Add an Employee":
              addEmployee();
              break;
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
            case "Update an Employee Role":
              updateEmployee();
              break;
            case "Exit":
              process.exit();
                    
          }
        })
};

// selects from a list of departments in Seeds
function allDepartments() {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw (err);
    console.table(res);
  
  }
)};
// selects from a list of roles in Seeds
function allRoles() {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw (err);
    console.table(res);
  
  }
)};
// selects from a list of roles in Seeds
function allEmployees() {
  db.query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", (err, res) => {
    if (err) throw (err);
    console.table(res);
  
  }
)};

const addDepartment = async () => {
//   prompts questions for the new dept
    await inquirer.prompt (
    {
        type: 'input',
        name: 'newDept',
        message: 'What is the name of the new Department you would like to add?'

    })
//   allows you to add to the seeds
    .then(function(deptName){
      db.query("INSERT INTO department (name) VALUES (?)", [deptName.newDept], (err, res) => {
        if (err) throw (err);
        console.table(res);

    })})
};
//   prompts questions to add new role
const addRole = async () => {
  await inquirer.prompt ([
    {
        type: 'input',
        name: 'newRole',
        message: 'What role you would like to add?'

    },
    {
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary of the new role?'

    },
    {
        type: 'input',
        name: 'newRoleDept',
        message: 'What is the id of the department the new role belongs to?'
    }]
    )
// adss new role into seeds
    .then(function(roleName){
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [roleName.newRole, roleName.newSalary, roleName.newRoleDept] , (err, res) => {
        if (err) throw (err);
        console.table(res);

})})
};
//   prompts questions to add new employee 
const addEmployee = async () => {
  await inquirer.prompt([
    {
      type: "input",
      message: "What's the first name of the employee?",
      name: "newFirstName"
    },
    {
      type: "input",
      message: "What's the last name of the employee?",
      name: "newLastName"
    },
    {
      type: "input",
      message: "What is the employees role id number?",
      name: "newRoleID"
    },
    {
      type: "input",
      message: "What is the manager id number?",
      name: "managerID"
    }]
  )

//   add new employee to seeds
  .then(function(employeeName){
    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [employeeName.newFirstName, employeeName.newLastName, employeeName.newRoleID, employeeName.managerID] , (err, res) => {
      if (err) throw (err);
      console.table(res);

    })})
  };

 //   prompts questions to update an employee
const updateEmployee = async () => {
  await inquirer.prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "What is the employees new role ID?",
        name: "roleUpdate"
      }]
    )

    .then(function(update){
      db.query("UPDATE employee SET role_id=? WHERE first_name= ?", [update.employeeUpdate, update.roleUpdate], (err, res) => {
        if (err) throw (err);
        console.table(res);

    })})

};

async function init() {
    await questions();
}

init();