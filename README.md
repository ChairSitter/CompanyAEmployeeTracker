# Company A Database Interface Application

https://drive.google.com/file/d/1tj7x-AAwS20MNSgQ9lCIiAUKuwauWHMp/view

## Description

This application is a terminal-only interface that uses inquirer for user interaction, and connects with a Postgres database via Sequelize. It also uses dotenv to protect sensitive database information. 

- This application allows a high-ranking company employee to access, view, and modify various elements in a company database. The database contains linked tables for departments, roles, and employees. The application displays requested information in table form.
- The application allows each table to be viewed, new rows to be added to any table, and employees to be viewed by department or manager, or an employee's role or manager to be changed. 
- The application ensures that the user is interacting safely and securely with the database. 
- This project was a learning experience for me, particularly with writing javascript and SQL code to interact with a database. It introduced me to complexities of database manipulation such as foreign key constraints and the logic of accessing data via connected data, as well as displaying and leveraging only the required data. 

## Installation

This project requires a matching Postgres database to utilize. It requires installation of pg, sequelize, dotenv, and inquirer node packages. 

## Usage

Instructions can be followed in-terminal after launching the project with node index.js. 

## Credits

The seed file and overall project design comes from UNC Coding Bootcamp. This challenge was worked on in in-class groups and portions of it could be similar to other student's syntax or code structure. 

## License

Please see the MIT license in this repository. 
