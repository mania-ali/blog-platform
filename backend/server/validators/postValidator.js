const { body,param } = require("express-validator");

const createPostValidation = [

    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("body")
        .notEmpty()
        .withMessage("Body is required")

];

const updatePostValidation = [

    body("title")
        .optional()
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("body")
        .optional()
        .notEmpty()
        .withMessage("Body cannot be empty"),

    body("published")
        .optional()
        .isBoolean()
        .withMessage("Published must be true or false")

];

const postIdValidation = [
    param("id")
        .isInt()
        .withMessage("Post ID must be a valid integer")
];


module.exports = {
    createPostValidation,
    updatePostValidation,
    postIdValidation
};