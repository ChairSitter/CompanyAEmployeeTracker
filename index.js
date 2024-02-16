const sequelize = require('./config/connection');
const inquirer = require('inquirer');

const viewEmployee = async() => {
    const result = await sequelize.query("SELECT * FROM employee");
    console.log(result[0]);
    return result[0];
}

const viewRole = async() => {
    const result = await sequelize.query("SELECT * FROM role");
    console.log(result[0]);
    return result[0];
}

const viewDepartment = async() => {
    const result = await sequelize.query("SELECT * FROM department");
    console.log(result[0]);
    return result[0];
}

const addEmployee = async() => {
    //first_name, last_name, role_id, manager_id
    const employeeInfo = await viewEmployee();
    const roleInfo = await viewRole();

    const employeePrompt = employeeInfo.map((employee) => {
        return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id
        }
    })

    const rolePrompt = roleInfo.map((role) => {
        return {
            name: role.title,
            value: role.id
        }
    })

    const response = await inquirer.prompt([
        {
            type: "text",
            message: "Please enter a first name",
            name: "firstname",
        },
        {
            type: "text",
            message: "Please enter a last name",
            name: "lastname",
        },
        {
            type: "list",
            message: "Please choose a manager",
            name: "manager",
            choices: employeePrompt  
        },
        {
            type: "list",
            message: "Please choose a role",
            name: "role",
            choices: rolePrompt
        }
    ])
    console.log(response.firstname);
    console.log(response.lastname);
    console.log(response.role);
    console.log(response.manager);
    try {
        sequelize.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstname}', '${response.lastname}', ${response.role}, ${response.manager})`);
    } catch(error) {
        console.log(error);
    }
}

const addRole = async() => {

}

const addDepartment = async() => {
    
}

//view all departments, view all roles, view all employees, 
//add a department, add a role, add an employee, 
//and update an employee role

const start = async() => {
    const response = await inquirer.prompt([
        {
            type: "list",
            message: "choose an option below:",
            name: "selection",
            choices: [
                {
                    name: "View all departments",
                    value: "VIEW DEPT"
                },
                {
                    name: "View all roles",
                    value: "VIEW ROLE"
                },
                {
                    name: "View all employees",
                    value: "VIEW EMP"
                },      
                {
                    name: "Add new department",
                    value: "ADD DEPT" 
                },
                {
                    name: "Add new role",
                    value: "ADD ROLE" 
                },
                {
                    name: "Add new employee",
                    value: "ADD EMP" 
                },

            ]
        }
    ])

    const { selection } = response;

    switch(selection){
        case "VIEW DEPT":
            console.log("you chose department view")
            const departmentsArray = viewDepartment();
            break;
        case "VIEW ROLE":
            console.log("you chose role view")
            const rolesArray = viewRole();
            break;
        case "VIEW EMP":
            console.log("you chose employee view")
            const employeeArray = viewEmployee();
            break;
        case "ADD DEPT":
            console.log("you chose add department")
            break;
        case "ADD ROLE":
            console.log("you chose add role")
            break;
        case "ADD EMP":
            console.log("you chose add employee")
            addEmployee();
            break;
    }
}

sequelize.sync({force: false}).then(start)

//view employees, view roles, also view departments, also be able to add/update employees

//Possibly create a class for each, and a method on each to view, add, do whatever else, then instantiate them in this file and do what's needed
