require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerOptions");
const cors = require("cors");
const db = require("./config/db.config.js");
const initRootAdmin = require("./initRootAdmin.js");
const PORT = process.env.PORT || 8080;

const app = express();

//Model 
const User = require("./models/User");
const Task = require("./models/Task");
User.hasMany(Task);
Task.belongsTo(User);

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));

// Database connection
db.authenticate()
    .then(() => {
        console.log("Database connected");
        return db.sync({ alter: true });
    })
    .then(async () => {
        console.log("Database synchronized");
        await initRootAdmin();
    })
    .catch((err) => {
        console.error("DB connection/sync error:", err);
    });

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: { message: "QuickTasks API is live" },
    });
});

// Route imports
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin/users", require("./routes/users.js"));
app.use("/api/task", require("./routes/task"));
app.use("/api/profile", require("./routes/profile"));

// Swagger docs route
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  