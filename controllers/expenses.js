const ExpenseServices = require('../services/expenseServices.js');

exports.postAddExpense = async (req, res, next) => {


    const {expenseAmount, description, category} = req.body;

    const userId = req.user.id;

    try {

        const expense = {
            expenseAmount: expenseAmount,
            description: description,
            category: category,
            userId: userId
        }

        const result = await ExpenseServices.createExpense(expense);

        res.json(result.dataValues);

    } catch(err) {
        console.log(err);
    }
}

exports.getAllExpenses = async (req, res, next) => {

    try{

        const userId = req.user.id;

        const expenses = await ExpenseServices.getUserExpenses({ userId: userId });

        res.json({expenses: expenses, isPremium: req.user.isPremium});

    } catch(err) {

        console.log(err);
    }
}

exports.getExpense = async (req, res, next) => {
    try {

        const id = req.params.id;

        const expense = await ExpenseServices.getExpenseByPk(id);
        
        res.json(expense);

    } catch(err) {
        console.log(err);
        res.status(404).json({success: false});
    }
}

exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;

    try{
        const expense = await ExpenseServices.getOneExpense({
            id: id,
            userId: userId
        });

        await ExpenseServices.destroyExpense(expense);

        res.json({success: true});

    } catch(err) {
        console.log(err);
        res.status(401).json({unauthorized: true});
    }
}

exports.editExpense = async (req, res, next) => {

    try {
        const id = req.params.id;

        await ExpenseServices.updateExpense(req.body, {id: id});
        
        res.json({success: true});

    } catch(err) {
        console.log(err);
        res.status(401).json({unauthorized: true});
    }
}