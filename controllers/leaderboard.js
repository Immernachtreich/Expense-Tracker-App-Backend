// Model Imports
const Users = require('../models/users.js');
const Expenses = require('../models/expenses.js');

exports.getUsers = async (req, res, next) => {
    
    try {

        const users = await Users.findAll();

        res.json(users);

    } catch(err) {
        
        console.log(err);
    }
}

exports.getUserExpenses = async (req, res, next) => {

    try {

        const userId = req.header('userId');

        const expenses = await Expenses.findAll( { where: { userId: userId } } );

        res.json(expenses);
        
    } catch(err) {
        console.log(err);
    }
}