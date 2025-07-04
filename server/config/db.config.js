const { Sequelize } = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: false,
        dialectOptions: isProduction
            ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false, // use true with a verified cert
                },
            }
            : {},
    }
);

module.exports = db;
