// middleware/handleValidation.js
const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            data: {},
            error: {
                code: 400,
                message: "Validation failed",
                details: errors.array(),
            },
        });
    }
    next();
};
