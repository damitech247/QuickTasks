const { Sequelize } = require("sequelize");
const db = require("../config/db.config.js");

const Task = db.define("Task", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
    },
    status: {
        type: Sequelize.ENUM("pending", "in-progress", "completed"),
        defaultValue: "pending",
    },
    priority: {
        type: Sequelize.ENUM("low", "medium", "high"),
        defaultValue: "medium",
    },
    deadline: {
        type: Sequelize.DATE,
    },
    completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});

module.exports = Task;
