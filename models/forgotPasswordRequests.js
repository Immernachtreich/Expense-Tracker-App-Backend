const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// Creating Users Table
const ForgotPasswordRequests = sequelize.define('forgotPasswordRequests',{
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },

    isActive : {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
    
})

module.exports = ForgotPasswordRequests;