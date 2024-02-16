const sequelize = require('./config/connection');
const inquirer = require('inquirer');

const start = async() => {
    const response = await inquirer.prompt([
        {
            type: "list",
            message: "choose an option below:",
            name: "selection",
            choices: [
                {
                    name: "view employees",
                    value: "VIEW EMP"
                },
                {
                    name: "view roles",
                    value: "VIEW ROLE"
                }
            ]
        }
    ])
}

sequelize.sync({force: false}).then(start)