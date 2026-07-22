const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/db"); // now exports the Prisma client, not pg pool
const { validationResult } = require("express-validator");

async function register(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({ message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "Registration successful",
            token
        });
    }
    catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = { register, login };