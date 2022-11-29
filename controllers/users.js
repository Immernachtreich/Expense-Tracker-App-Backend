const Users = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up
exports.postAddUser = async (req, res, next) => {
    
    const {username, email, password} = req.body;

    try {

        const user = await Users.findAll({where: {email: email}});

        if(user.length === 0) {

            const saltRounds = 10;

            const hash = await bcrypt.hash(password, saltRounds);

            await Users.create({
                username: username,
                email: email,
                password: hash,
                isPremium: false
            });
            
            res.json({alreadyExisting: false});

        } else {

            res.json({alreadyExisting: true});
        }
        

    } catch(err) {
        console.log(err);
    }
}

// Login
exports.loginUser = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        // This returns an array 
        // But due to nature of email being a unique value the array will contain either no users or only one user
        const user = await Users.findAll({where: {email: email}});

        if(user.length > 0) {

            const correctPassword = await bcrypt.compare(password, user[0].dataValues.password);
            
            if(correctPassword) {

                res.json({
                    userExists: true,
                    correctPassword:true,
                    token: generateToken(user[0].id, user[0].username)
                });

            } else {

                res.status(401).json({
                    userExists: true,
                    correctPassword:false
                });
            }

        } else {
            res.status(404).json({userExists: false});
        }


    } catch(err) {

        console.log(err);
    }
}

function generateToken(id, username) {

    return jwt.sign({
        userId: id,
        username: username
    }, process.env.SECRET_KEY);
}