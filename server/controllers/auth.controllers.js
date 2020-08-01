const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Image = require("../models/images.model");
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
                        token: data.token,
                        type: data.type,
                    });
                })
                .catch(err => {
                    res.status(400).json({error: "Failed to register"});
                });
        }
    });
};

const login = (req, res) => {
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
};
const profile = (req, res) => {
    const {token} = req.headers;
    console.log(req.headers);
    User.findOne({token})
        .then(user => {
            console.log(user);
            if (user) {
                switch (user.type) {
                    case "A":
                        Image.find({imageName: "image1"}, (err, images) => {
                            if (err) throw err;
                            if (images.length) {
                                res.status(200).json({
                                    username: user.username,
                                    type: user.type,
                                    images,
                                });
                            } else {
                                res.status(200).json({
                                    username: user.username,
                                    type: user.type,
                                });
                            }
                        });

                        break;
                    case "B":
                        Image.find(
                            {imageName: {$in: ["image1", "image2"]}},
                            (err, images) => {
                                if (err) throw err;
                                if (images.length) {
                                    res.status(200).json({
                                        username: user.username,
                                        type: user.type,
                                        images,
                                    });
                                } else {
                                    res.status(200).json({
                                        username: user.username,
                                        type: user.type,
                                    });
                                }
                            }
                        );

                        break;
                    case "C":
                        Image.find(
                            {imageName: {$in: ["image2", "image3"]}},
                            (err, images) => {
                                if (err) throw err;
                                if (images.length) {
                                    res.status(200).json({
                                        username: user.username,
                                        type: user.type,
                                        images,
                                    });
                                } else {
                                    res.status(200).json({
                                        username: user.username,
                                        type: user.type,
                                    });
                                }
                            }
                        );

                        break;
                    default:
                        break;
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: "User not found",
            });
        });
};
const imageUpload = (req, res) => {
    const {imageName, data} = req.body;
    const newImage = new Image({
        imageName,
        data,
    });
    newImage
        .save()
        .then(result => {
            res.status(200).json({message: "success"});
        })
        .catch(err => {
            res.status(400).json({error: "failed"});
        });
};
const allImages = (req, res) => {
    Image.find()
        .then(images => {
            res.status(200).json(images);
        })
        .catch(err => {
            res.status(400).json({error: "failed"});
        });
};
module.exports = {login, signup, profile, imageUpload, allImages};
