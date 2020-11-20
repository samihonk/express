const { Sequelize } = require("sequelize");
const config = require("config");

module.exports = new Sequelize(
	config.get("DB_NAME"),
	config.get("DB_USERNAME"),
	config.get("DB_PASSWORD"),
	{
		host: config.get("DB_HOST"),
		port: config.get("DB_PORT"),
		dialect:
			"postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
	}
);
