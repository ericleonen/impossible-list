const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const ObjectId = require("mongodb").ObjectId;

// load input validators
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const { User } = require("../../models/User");

router.post("/register", (req, res) => {
    // form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({
                email: "Email already exists"
            });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                goals: [],
                following: []
            });

            // salt and hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }

                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    // form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email }).then(user => {
        // check if user exists
        if (!user) {
            return res.status(404).json({ email: "Email not found" });
        }

        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // user matched
                // create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 60 * 60 * 24 * 356
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            }
            else {
                return res
                    .status(400)
                    .json({ password: "Password incorrect" });
            }
        });
    });
});

router.get("/search", (req, res) => {
    User
        .find(
            { 
                "name": {
                    "$regex": `(?i)${req.query.query}`,
                },
                "_id": {
                    "$ne": ObjectId(req.query.userId)
                }
            },
            { "name": 1 }
        )
        .then(users => {
            res.send(users);
        })
        .catch(err => console.log(err))
});

router.get("/:id", (req, res) => {
    User
        .findOne({ "_id": ObjectId(req.params.id)})
        .then(user => {
            res.send(user)
        })
        .catch(err => console.log(err))
});

router.put("/follow", (req, res) => {
    User
        .findOne({ "_id": ObjectId(req.body.id) })
        .then(({name}) => {
            User
                .updateOne(
                    { "_id": ObjectId(req.body.userId) },
                    {  
                        "$push": {
                            "following": {
                                id: req.body.id,
                                name
                            }
                        }
                    }
                )
                .then(() => res.end())
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});

router.put("/unfollow", (req, res) => {
    User
        .updateOne(
            { "_id": ObjectId(req.body.userId) },
            {
                "$pull": {
                    "following": { "id" : req.body.id }
                }
            }
        )
        .then(() => res.end())
        .catch(err => console.log(err));
});

router.get("/following/:id", (req, res) => {
    User
        .findOne(
            { "_id": ObjectId(req.params.id) },
            { "_id": 0, "following": 1 }
        )
        .then(data => res.send(data))
        .catch(err => console.log(err)); 
});

module.exports = router;