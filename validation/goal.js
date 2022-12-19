const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateGoalInput(data) {
    let errors = {};

    // convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";

    // title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};