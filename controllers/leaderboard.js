// Services Imports
const UserServices = require('../services/userServices.js');
const ExpenseServices = require('../services/expenseServices.js');

exports.getUsers = async (req, res, next) => {
    
    try {

        const users = await UserServices.getAllUsers();

        res.json(users);

    } catch(err) {
        
        console.log(err);
    }
}

exports.getUserExpenses = async (req, res, next) => {

    try {

        const userId = req.header('userId');

        const expenses = await ExpenseServices.getUserExpenses({userId: userId});

        res.json(expenses);
        
    } catch(err) {
        console.log(err);
    }
}