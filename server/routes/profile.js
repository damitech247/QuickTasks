// server\routes\profile.js
const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { updateOwnPassword } = require("../controllers/profileController");

router.put("/password", requireAuth, updateOwnPassword);

module.exports = router;
