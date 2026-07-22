const { param } = require("express-validator");

const getUserPostsValidation = [
    param("userId")
        .isInt()
        .withMessage("userId must be a valid integer")
];

module.exports = {
    getUserPostsValidation
};