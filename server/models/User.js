// server\models\User.js
const { Sequelize } = require("sequelize");
const db = require("../config/db.config.js");

const User = db.define("User", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: "user", // 'user' or 'admin'
    },
    department: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    accountLocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    failedLoginAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    isRoot: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;
