const { Sequelize } = require("sequelize");
const config = require("config");

module.exports = new Sequelize(
	config.get("DB.NAME"),
	config.get("DB.USERNAME"),
	config.get("DB.PASSWORD"),
	{
		host: config.get("DB.HOST"),
		port: config.get("DB.PORT"),
		dialect:
			"postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
	}
);
