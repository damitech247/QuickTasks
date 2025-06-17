// server\routes\admin\users.js

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const requireAdmin = require("../../middleware/requireAdmin");
const userController = require("../../controllers/admin/userController");
const handleValidation = require("../../middleware/handleValidation");
const {
    validateUserCreation,
    validateUserUpdate,
} = require("../../middleware/validators");

router.use(auth, requireAdmin);

// GET /admin/users - list all users
router.get("/", userController.listUsers);

// GET /admin/users/:id - get single user
router.get("/:id", userController.getUserById);

// POST /admin/users - create new user
router.post("/", validateUserCreation, handleValidation, userController.createUser);

// PUT /admin/users/:id - update user
router.put("/:id", validateUserUpdate, handleValidation, userController.updateUser);

// DELETE /admin/users/:id - delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
