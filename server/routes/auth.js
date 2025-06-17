const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateLogin } = require("../middleware/validators");
const handleValidation = require("../middleware/handleValidation");

router.post("/login", validateLogin, handleValidation, authController.login);

module.exports = router;
