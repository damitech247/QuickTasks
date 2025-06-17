// server\middleware\validators.js
const { body } = require("express-validator");

// -------------------
// USER VALIDATORS
// -------------------

exports.validateUserCreation = [
    body("firstName")
        .notEmpty().withMessage("First name is required")
        .matches(/^[A-Za-z]+$/).withMessage("First name must contain only letters"),

    body("lastName")
        .notEmpty().withMessage("Last name is required")
        .matches(/^[A-Za-z]+$/).withMessage("Last name must contain only letters"),

    body("email")
        .isEmail().withMessage("Valid email is required"),

    body("password")
        .isStrongPassword({
            minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1
        }).withMessage("Password must be at least 8 characters and include upper/lowercase, number, and symbol"),

    body("role")
        .optional().isIn(["user", "admin"]).withMessage("Role must be 'user' or 'admin'"),

    body("department")
        .optional().isString()
];

exports.validateUserUpdate = [
    body("firstName")
        .optional()
        .matches(/^[A-Za-z]+$/).withMessage("First name must contain only letters"),

    body("lastName")
        .optional()
        .matches(/^[A-Za-z]+$/).withMessage("Last name must contain only letters"),

    body("password")
        .optional()
        .isStrongPassword({
            minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1
        }).withMessage("Password must be strong (8+ chars, 1 upper, 1 lower, 1 number, 1 symbol)"),

    body("role")
        .optional().isIn(["user", "admin"]).withMessage("Role must be 'user' or 'admin'"),

    body("department")
        .optional().isString()
];

// -------------------
// TASK VALIDATORS
// -------------------

exports.validateTaskCreation = [
    body("title")
        .notEmpty().withMessage("Title is required"),

    body("description")
        .optional().isString().withMessage("Description must be a string"),

    body("deadline")
        .optional().isISO8601().withMessage("Deadline must be a valid date"),

    body("priority")
        .optional().isIn(["low", "medium", "high"]).withMessage("Priority must be low, medium, or high")
];

exports.validateTaskUpdate = [
    body("title")
        .optional().notEmpty().withMessage("Title must not be empty"),

    body("description")
        .optional().isString().withMessage("Description must be a string"),

    body("status")
        .optional().isIn(["pending", "in-progress", "completed"]).withMessage("Invalid status"),

    body("deadline")
        .optional().isISO8601().withMessage("Deadline must be a valid date"),

    body("priority")
        .optional().isIn(["low", "medium", "high"]).withMessage("Priority must be low, medium, or high"),

    body("completedAt")
        .optional().isISO8601().withMessage("CompletedAt must be a valid date")
];

exports.validateLogin = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
];
