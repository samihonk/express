const { Sequelize } = require("sequelize");
const config = require("config");

module.exports = new Sequelize(
	process.env.DB_NAME || config.get("DB.NAME"),
	process.env.DB_USERNAME || config.get("DB.USERNAME"),
	process.env.DB_PASSWORD || config.get("DB.PASSWORD"),
	{
		host: process.env.DB_HOST || config.get("DB.HOST"),
		port: process.env.DB_PORT || config.get("DB.PORT"),
		dialect: process.env.DB_DIALECT || config.get("DB.DIALECT"),
	}
);
