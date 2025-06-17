// server\controllers\admin\userController.js
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { success, error } = require("../../utils/response");

exports.listUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "otp", "otpExpire"] },
  });
  return success(res, users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password", "otp", "otpExpire"] },
  });

  if (!user) return error(res, 404, "User not found");
  return success(res, user);
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, department } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return error(res, 409, "Email already exists");

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      role,
      department,
    });

    return success(res, newUser, 201);
  } catch (err) {
    return error(res, 500, "User creation failed", { details: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return error(res, 404, "User not found");

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      rest.password = hashed;
    }

    await user.update(rest);
    return success(res, user);
  } catch (err) {
    return error(res, 500, "Update failed", { details: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return error(res, 404, "User not found");

  await user.destroy();
  return success(res, {});
};


exports.updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return error(res, 404, "User not found");

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      rest.password = hashed;
    }

    await user.update(rest);
    return success(res, user);
  } catch (err) {
    return error(res, 500, "Update failed", { details: err.message });
  }
};

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

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return error(res, 404, "User not found");

  if (req.user.id === user.id) {
    return error(res, 403, "You cannot delete your own account");
  }

  await user.destroy();
  return success(res, {});
};
