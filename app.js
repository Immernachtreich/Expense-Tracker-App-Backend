const express = require('express'); // Express Import
const bodyParser= require('body-parser'); // Body-Parser Import
const cors = require('cors'); // Cors Import

// .env Imports and config
const dotenv = require('dotenv');
dotenv.config();

// MySQL Database import (Local Import)
const sequelize = require('./util/database.js'); 

// Routes Imports
const expensesRoutes = require('./routes/expenses'); 
const userRoutes = require('./routes/users.js');
const premiumRoutes = require('./routes/premium.js');
const leaderboardRoutes = require('./routes/leaderboard.js'); 

// Importing Models
const Users = require('./models/users');
const Expenses = require('./models/expenses');
const Orders = require('./models/orders');

const app = express(); // Initializing the backend

app.use(cors()); // Initializing Cors
app.use(bodyParser.json({ extended: false })); // Initializing Body Parser

// Expenses Routes
app.use('/expenses', expensesRoutes);
app.use('/user', userRoutes);
app.use('/premium', premiumRoutes);
app.use('/leaderboard', leaderboardRoutes);

// Error Routes
app.use((req, res) => {
    res.status(404).send(`<h1> Page Not Found </h1>`);
});


/*
* Defining Relationships
*/

//One to Many User 1<--->M Orders
Orders.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(Orders);

// One to Many User 1<--->M Expenses
Expenses.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(Expenses);


// Initializing database and listening to port
sequelize.sync()
    .then((result) => {
        app.listen(5005);
    })
    .catch(err => {
        console.log(err);
    })
