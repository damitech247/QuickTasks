// server\routes\task.js
const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const handleValidation = require("../middleware/handleValidation");
const taskController = require("../controllers/taskController");
const { validateTaskCreation, validateTaskUpdate } = require("../middleware/validators");

router.use(requireAuth);

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", validateTaskCreation, handleValidation, taskController.createTask);
router.put("/:id", validateTaskUpdate, handleValidation, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
