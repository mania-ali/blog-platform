const { body } = require("express-validator");

const registerValidation=[
body("username")
.notEmpty()
.withMessage("username required"),

body("email")
.isEmail()
.withMessage("Invalid email"),

body("password")
.isLength({ min: 8 })
.withMessage("Password must be at least 8 characters")


];
const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")

];
module.exports={registerValidation,loginValidation};