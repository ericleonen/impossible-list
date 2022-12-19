const express = require("express");
const { db } = require("../../models/User");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const validateGoalInput = require("../../validation/goal");

// load user model
const { User } = require("../../models/User");

router.get("/all/:userId", (req, res) => {
    if (req.params.userId) {
        User.findOne({ "_id": ObjectId(req.params.userId) }, { goals : 1, _id: 0 })
            .then(goals => res.send(goals))
            .catch(err => console.log(err));
    }
});

router.post("/create", (req, res) => {
    // input validation
    const { errors, isValid } = validateGoalInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newGoal = {
        title: req.body.title,
        completed: false
    };

    User.updateOne(
        { "_id": ObjectId(req.body.userId) }, 
        { 
            "$push": { 
                "goals": newGoal
            }
        }
    )
    .then(() => res.end())
    .catch((err) => {
        console.log(err);
    });
});

router.put("/update", (req, res) => {
    // input validation
    const { errors, isValid } = validateGoalInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.updateOne(
        { "_id": ObjectId(req.body.userId) },
        {
            "$set": {
                ["goals." + req.body.index + ".title"]: req.body.title
            }
        }
    )
    .then(() => res.end())
    .catch(err => console.log(err));
});

router.put("/updateCompleted", (req, res) => {
    User.updateOne(
        { "_id": ObjectId(req.body.userId) },
        {
            "$set": {
                ["goals." + req.body.index + ".completed"]: req.body.completed
            }
        }
    )
    .then(() => res.end())
    .catch(err => console.log(err));
});

router.put("/delete", (req, res) => {
    User.updateOne(
        { "_id": ObjectId(req.body.userId) },
        {
            "$unset": {
                ["goals." + req.body.index]: 1
            }
        }
    )
    .then(() => {
        User.updateOne(
            { "_id": ObjectId(req.body.userId) },
            {
                "$pull": {
                    "goals": null
                }
            }
        )
        .then(() => res.end())
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;