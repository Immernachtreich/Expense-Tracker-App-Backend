const ExpenseServices = require('../services/expenseServices.js');

const ITEMS_PER_PAGE = 3;

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

        const pageNumber = req.query.page;

        const userId = req.user.id;

        const totalExpenses = await ExpenseServices.countExpense({userId: userId});

        const expenses = await ExpenseServices.getUserExpenses({
                offset: (pageNumber - 1) * ITEMS_PER_PAGE,
                limit: ITEMS_PER_PAGE,
                where: {
                    userId: userId
                }
            },
        ); 
        
        const data = {
            expenses: expenses, 
            isPremium: req.user.isPremium,

            totalExpenses: totalExpenses,

            hasNextPage: (ITEMS_PER_PAGE * pageNumber) < totalExpenses,
            hasPreviousPage: pageNumber > 1,

            nextPage: parseInt(pageNumber) + 1,
            currentPage: parseInt(pageNumber),
            previousPage: parseInt(pageNumber) - 1,

            lastPage: Math.ceil(totalExpenses / ITEMS_PER_PAGE)
        }

        res.json(data);

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