const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const signup = (req, res) => {
    const {username, password, type} = req.body;
    User.findOne({username}, (err, result) => {
        if (result) {
            res.status(400).json({error: "User Already Exist"});
        } else {
            const hash = bcrypt.hashSync(password, 10);
            const token = jwt.sign(username, JWT_SECRET);
            const newUser = new User({
                username,
                password: hash,
                type,
                token,
            });

            newUser
                .save()
                .then(data => {
                    console.log("data", data);
                    res.status(200).json({
                        username: data.username,
                        token:data.token,
                        type: data.type,
                    });
                })
                .catch(err => {
                    res.status(400).json({error: "Failed to register"});
                });
        }
    });
};

const login=(req, res) => {
    const {username, password} = req.body;
    User.findOne({username}, (err, result) => {
        if (result) {
            const match = bcrypt.compareSync(password, result.password);
            if (match) {
                res.status(200).json({
                    username: result.username,
                    type: result.type,
                    token: result.token,
                });
            } else {
                res.status(400).json({
                    error: "Invalid Password",
                });
            }
        } else {
            res.status(404).json({
                error: "User Not Found",
            });
        }
    });
}

module.exports={login,signup}