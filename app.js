// Package Imports
const express = require('express');
const bodyParser= require('body-parser'); 
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Node Modules Imports
const fs = require('fs');
const path = require('path');
// const https = require('https');

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
const passwordRoutes = require('./routes/password.js'); 

// Importing Models
const Users = require('./models/users');
const Expenses = require('./models/expenses');
const Orders = require('./models/orders');
const ForgotPasswordRequests = require('./models/forgotPasswordRequests');
const DownloadLinks = require('./models/downloadLinks');

const app = express(); // Initializing the backend

// // Initilizing https
// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

// Initialzing logging Files
const accessLogFiles = fs.createWriteStream(
    path.join(__dirname, 'access.log'), 
    { flags: 'a' }
)

// Initializing Middleware
app.use(cors()); 
app.use(bodyParser.json({ extended: false }));
// app.use(helmet());
// app.use(compression());
app.use(morgan('combined', {stream: accessLogFiles})); 

// Expenses Routes
app.use('/expenses', expensesRoutes);
app.use('/user', userRoutes);
app.use('/premium', premiumRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/password', passwordRoutes);

// Deployment Home Route
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, `frontend/${req.url}`));
});

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

// One to Many User 1<--->M ForgotPasswordRequests
ForgotPasswordRequests.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(ForgotPasswordRequests);

// One to Many User 1<--->M DownloadLinks
DownloadLinks.belongsTo(Users, { constraints: true, onDelete: 'CASCADE' });
Users.hasMany(DownloadLinks);

// Initializing database and listening to port
sequelize.sync()
    .then((result) => {
        // https
        // .createServer({key: privateKey, cert: certificate},app)
        app.listen(5005);
    })
    .catch(err => {
        console.log(err);
    });
