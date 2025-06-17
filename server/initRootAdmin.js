const bcrypt = require("bcryptjs");
const User = require("./models/User");

const initRootAdmin = async () => {
    const email = process.env.ROOT_ADMIN_EMAIL;
    const password = process.env.ROOT_ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error("Missing ROOT_ADMIN_EMAIL or ROOT_ADMIN_PASSWORD in environment variables");
    }

    const existing = await User.findOne({ where: { isRoot: true } });

    if (!existing) {
        const hashed = await bcrypt.hash(password, 10);
        await User.create({
            firstName: "Administrator",
            lastName: "",
            email,
            password: hashed,
            role: "admin",
            department: "Technology",
            accountLocked: false,
            isRoot: true,
        });
        console.log("✅ Root admin created.");
    } else {
        console.log("ℹ️ Root admin already exists.");
    }
};

module.exports = initRootAdmin;
