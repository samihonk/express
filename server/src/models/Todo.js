const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config/db");
const { alter, logging } = require("../../config/config");
const User = require("./User");

const Todo = db.define(
	"Todo",
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		date: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			validate: {
				isDate: true,
			},
		},
	},
	{
		// Other model options go here
	}
);
//User,{as:"UserId"} for specific column name Default tablename followed by id in uppercase example UserId
Todo.belongsTo(User);
// Sync doesn't do anything if table exists. To later table add { alter: true }  and to recreate table (drop & create) add { force: true }
// Dont use in production
Todo.sync({ alter, logging }).then(() => {
	console.log("Table updated!");
});

module.exports = Todo;
