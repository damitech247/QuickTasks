// server\middleware\auth.js
const jwt = require("jsonwebtoken");
const { error } = require("../utils/response");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return error(res, 401, "Authorization token missing");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user payload to request
        next();
    } catch (err) {
        return error(res, 403, "Invalid or expired token");
    }
};
