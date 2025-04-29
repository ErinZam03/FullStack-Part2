const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

const register = async(req, res) => {
    //Validate message to insure that all parameters are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    const user = new User(
        {
            name: req.body.name,      //Set Username
            email: req.body.email,    //Set email address
            password: ''              //Start with empty password
        }
    );
    user.setPassword(req.body.password) //Set user password
    const q  = await user.save();

    if(!q) {

        //Database returned no data
        return res
            .status(400)
            .json(err);
    } else {

        //Return new user token
        const token = user.generateJWT();
        return res  
            .status(200)
            .json(token);
    }
};

// POST /api/login
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});

    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res
                .status(404)
                .json(err);
        }

        if(user) {
            const token = user.generateJWT();
            res
                .status(200)
                .json({token});

        } else {
            res
                .status(401)
                .json(info);

        }
    })(req, res);
};


module.exports = {
    register,
    login
};