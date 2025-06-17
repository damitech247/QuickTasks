// server\controllers\taskController.js

const Task = require("../models/Task");
const { success, error } = require("../utils/response");

exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline, priority } = req.body;
        const newTask = await Task.create({
            title,
            description,
            deadline,
            priority,
            UserId: req.user.id,
        });
        return success(res, newTask, 201);
    } catch (err) {
        return error(res, 500, "Task creation failed", { details: err.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { UserId: req.user.id } });
        return success(res, tasks);
    } catch (err) {
        return error(res, 500, "Failed to fetch tasks", { details: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, UserId: req.user.id },
        });
        if (!task) return error(res, 404, "Task not found");
        return success(res, task);
    } catch (err) {
        return error(res, 500, "Failed to fetch task", { details: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, UserId: req.user.id },
        });
        if (!task) return error(res, 404, "Task not found");

        const { title, description, status, deadline, priority, completedAt } = req.body;

        await task.update({ title, description, status, deadline, priority, completedAt });
        return success(res, task);
    } catch (err) {
        return error(res, 500, "Failed to update task", { details: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, UserId: req.user.id },
        });
        if (!task) return error(res, 404, "Task not found");

        await task.destroy();
        return success(res, {});
    } catch (err) {
        return error(res, 500, "Failed to delete task", { details: err.message });
    }
};
