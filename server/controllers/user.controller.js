const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// alternate syntax for exporting controller functions
module.exports = {
    register: (req, res) => {
        // use the object passed in to create a User instance
        // this triggers our virtual field creation
        const newUser = new User(req.body);
        console.log(newUser);
        
        // saving to the db and it will trigger our presave function
        newUser.save()
            .then(() => {
                console.log("successful registration");
                res.json({
                    message: "Successfully registered",
                    user: newUser,
                })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    login: (req, res) => {
        // find the email that they are trying to login with
        User.findOne({ email: req.body.email })
            .then((user) => {
                if(user === null) {
                    res.status(400).json({ message: "Invalid Login Attempt - 1"})
                } else {
                // verify the password if valid
                    bcrypt.compare(req.body.password, user.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid === true) {
                                // return a success with a cookie to prove they logged in successfully
                                console.log("password is valid");
                                res.cookie("usertoken", 
                                jwt.sign({
                                    _id: user._id,
                                    username: user.username,
                                    email: user.email
                                },
                                process.env.JWT_SECRET), 
                                {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000)
                                })
                                .json({
                                    message: "Successfully logged in",
                                    userLoggedIn: {
                                        username: user.username,
                                    }
                                })
                            } else {
                                res.status(400).json({ message: "Invalid Login Attempt - 2"})
                            }
                        })
                        .catch((err) => {
                            res.status(400).json({ message: "Invalid Login Attempt - 3"})
                        })
                }
            })
            .catch((err) => {
                res.status(400).json({ message: "Invalid Login Attempt - 4"})
            })
    },

    logout: (req,res) => {
        console.log("Logging out!");
        res.clearCookie("usertoken");
        res.json({ message: "You have successfully logged out!"});
    }
}