const sequelize = require('./config/connection');
const inquirer = require('inquirer');

const viewEmployee = async() => {
    const result = await sequelize.query("SELECT * FROM employee");
    // console.log(result[0]);
    return result[0];
}

const viewRole = async() => {
    const result = await sequelize.query("SELECT * FROM role");
    // console.log(result[0]);
    return result[0];
}

const viewDepartment = async() => {
    const result = await sequelize.query("SELECT * FROM department");
    // console.log(result[0]);
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
    //title, salary, department_id
    const departmentInfo = await viewDepartment();

    const departmentPrompt = departmentInfo.map((department) => {
        return {
            name: department.name,
            value: department.id
        }
    })

    const response = await inquirer.prompt([
        {
            type: "text",
            message: "Please enter a job title",
            name: "roletitle",
        },
        {
            type: "text",
            message: "Please enter a job salary",
            name: "rolesalary",
        },
        {
            type: "list",
            message: "Please choose a department",
            name: "departmentID",
            choices: departmentPrompt
        }
    ])
    console.log(response.roletitle)
    console.log(response.rolesalary)
    console.log(response.departmentID)

    try {
        sequelize.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.roletitle}', '${response.rolesalary}', ${response.departmentID})`);
    } catch(error) {
        console.log(error);
    }
}

const addDepartment = async() => {
    const response = await inquirer.prompt([
        {
            type: "text",
            message: "Please enter a department name",
            name: "departmentname",
        }
    ])
    console.log(response.departmentname)

    try {
        sequelize.query(`INSERT INTO department (name) VALUES ('${response.departmentname}')`);
    } catch(error) {
        console.log(error);
    }
}

const updateEmpRole = async() => {
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
            type: "list",
            message: "Please choose an employee to update",
            name: "employee",
            choices: employeePrompt  
        },
        {
            type: "list",
            message: "Please choose a role for this employee",
            name: "role",
            choices: rolePrompt
        }
    ])

    try {
        sequelize.query(`UPDATE employee SET role_id = ${response.role} WHERE id = ${response.employee}`);
    } catch(error) {
        console.log(error);
    }
}

const updateEmpManager = async() => {
    const employeeInfo = await viewEmployee();

    const employeePrompt = employeeInfo.map((employee) => {
        return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id
        }
    })

    const response = await inquirer.prompt([
        {
            type: "list",
            message: "Please choose an employee to update",
            name: "employee",
            choices: employeePrompt  
        },
        {
            type: "list",
            message: "Please choose a manager for this employee",
            name: "manager",
            choices: employeePrompt
        }
    ])

    try {
        sequelize.query(`UPDATE employee SET manager_id = ${response.manager} WHERE id = ${response.employee}`);
    } catch(error) {
        console.log(error);
    }
}

const viewEmpByManager = async() => {
    const employeeInfo = await viewEmployee();
    let managerIds = [];
    let viewManagers = [];
    let employeeArray = [];
    for(let i = 0; i < employeeInfo.length; i++){
        if(employeeInfo[i].manager_id){
            managerIds.push(employeeInfo[i].manager_id);
        }
    }
    for(let j = 0; j < employeeInfo.length; j++){
        if(managerIds.includes(employeeInfo[j].id)){
            viewManagers.push(employeeInfo[j]);
        }
    }
    const managerPrompt = viewManagers.map((manager) => {
        return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id
        }
    })
    const response = await inquirer.prompt([
        {
            type: "list",
            message: "Please choose a manager to view their employees:",
            name: "manager",
            choices: managerPrompt
        }
    ])
    for(let k = 0; k < employeeInfo.length; k++){
        if(employeeInfo[k].manager_id === response.manager){
            employeeArray.push(employeeInfo[k]);
        }
    }
    return employeeArray;
}

const viewEmpByDepartment = async() => {
    const departmentInfo = await viewDepartment();
    const roleInfo = await viewRole();
    const employeeInfo = await viewEmployee();
    let departmentRoleArray = [];
    let employeeArray = [];
    const departmentPrompt = departmentInfo.map((department) => {
        return {
            name: department.name,
            value: department.id
        }
    })
    const response = await inquirer.prompt([
        {
            type: "list",
            message: "Please choose a department to view its employees:",
            name: "department",
            choices: departmentPrompt
        }
    ])
    for(let i = 0; i < roleInfo.length; i++){
        if(roleInfo[i].department_id === response.department){
            departmentRoleArray.push(roleInfo[i].id);
        }
    }
    for(let j = 0; j < employeeInfo.length; j++){
        if(departmentRoleArray.includes(employeeInfo[j].role_id)){
            employeeArray.push(employeeInfo[j]);
        }
    }
    return employeeArray;
}

const start = async() => {
    console.log("Welcome to Company A Employee Manager.")
    const response = await inquirer.prompt([
        {
            type: "list",
            message: "Please choose an option below:",
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
                {
                    name: "Update an employee's role",
                    value: "UPDATE EMP ROLE"
                },
                {
                    name: "Update an employee's manager",
                    value: "UPDATE EMP MANAGER"  
                },
                //need to implement:
                {
                    name: "View employees by manager",
                    value: "VIEW EMP BY MANAGER"
                },
                //need to implement:
                {
                    name: "View employees by department",
                    value: "VIEW EMP BY DEPARTMENT"
                }
            ]
        }
    ])

    const { selection } = response;

    switch(selection){
        case "VIEW DEPT":
            console.log("You chose view all departments.")
            const departmentsArray = await viewDepartment();
            console.table(departmentsArray);
            break;
        case "VIEW ROLE":
            console.log("You chose view all roles.")
            const rolesArray = await viewRole();
            console.table(rolesArray);
            break;
        case "VIEW EMP":
            console.log("You chose view all employees.")
            const employeeArray = await viewEmployee();
            console.table(employeeArray);
            break;
        case "ADD DEPT":
            console.log("You chose add department.")
            addDepartment();
            break;
        case "ADD ROLE":
            console.log("You chose add role.")
            addRole();
            break;
        case "ADD EMP":
            console.log("You chose add employee.")
            addEmployee();
            break;
        case "UPDATE EMP ROLE":
            console.log("You chose update an employee's role.");
            updateEmpRole();
            break;
        case "UPDATE EMP MANAGER":
            console.log("You chose update an employee's manager.");
            updateEmpManager();
            break;
        case "VIEW EMP BY MANAGER":
            console.log("You chose view employees by manager.");
            const employeesByManager = await viewEmpByManager();
            console.table(employeesByManager);
            break;
        case "VIEW EMP BY DEPARTMENT":
            console.log("You chose view employees by department.");
            const employeesByDepartment = await viewEmpByDepartment();
            console.table(employeesByDepartment);
            break;
    }
}

// Delete departments, roles, and employees.
// View the total utilized budget of a department&mdash;
// in other words, the combined salaries of all employees in that department.

sequelize.sync({force: false}).then(start)