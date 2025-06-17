const { error } = require("../utils/response");

module.exports = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return error(res, 403, "Admin access only");
    }
    next();
};
