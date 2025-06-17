// server\controllers\profileController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { success, error } = require("../utils/response");

exports.updateOwnPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return error(res, 400, "Both current and new passwords are required");
    }

    const user = await User.findByPk(req.user.id);
    if (!user) return error(res, 404, "User not found");

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return error(res, 401, "Current password is incorrect");

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return success(res, { message: "Password updated successfully" });
};

