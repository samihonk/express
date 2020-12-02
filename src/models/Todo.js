const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../config/db");
const user = require("./User");

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

Todo.hasOne(user);
// Alter table sync doesn't do anything if table exists{ alter: true } Recreate table (drop & create){ force: true }
Todo.sync({ alter: true }).then(() => {
	console.log("Table updated!");
});

module.exports = Todo;
