const sequelize = require('./config/connection');
const inquirer = require('inquirer');

sequelize.sync({force: false}).then(() => {
    console.log("connection successful!")
})