const Sequelize = require('sequelize');

// Initializing the database
const sequelize = new Sequelize(
    'expense-tracker-app-db',
    'root',
    'Chickoo11',
    {
        dialect: 'mysql',
        host: 'localhost'
    });

module.exports = sequelize;