const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { success, error } = require("../utils/response");

const MAX_FAILED_ATTEMPTS = 5;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return error(res, 400, "Email and password are required");
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return error(res, 401, "Invalid credentials");
        }

        // Check if the account is locked
        if (user.accountLocked) {
            return error(res, 403, "Account is locked");
        }

        // Validate the password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            // Increment failed login attempts and lock if threshold reached
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
                user.accountLocked = true;
            }
            await user.save();
            return error(res, 401, "Invalid credentials");
        }

        // Reset failed login attempts on successful login
        user.failedLoginAttempts = 0;
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );


        return success(res, {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (err) {
        return error(res, 500, "Login failed", { details: err.message });
    }
};